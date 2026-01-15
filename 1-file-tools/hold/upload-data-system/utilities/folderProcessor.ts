import type { FileType, FileNode, FolderNode } from '../upload-data-system/types'
import { isValidFileType, FILE_TYPES } from './fileTypes'
import { parseFileContent } from './fileParser'

/**
 * Sort folder children alphabetically (folders first, then files)
 */
export const sortFolderChildren = (node: FolderNode): void => {
  node.children.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  node.children.forEach(child => {
    if (child.type === 'folder') sortFolderChildren(child)
  })
}

/**
 * Read directory entries recursively using FileSystem API
 */
export const readDirectory = async (dirEntry: FileSystemDirectoryEntry): Promise<File[]> => {
  const files: File[] = []
  const reader = dirEntry.createReader()
  
  const readEntries = (): Promise<FileSystemEntry[]> => {
    return new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject)
    })
  }
  
  const getFile = (fileEntry: FileSystemFileEntry): Promise<File> => {
    return new Promise((resolve, reject) => {
      fileEntry.file(resolve, reject)
    })
  }
  
  let entries: FileSystemEntry[]
  do {
    entries = await readEntries()
    for (const entry of entries) {
      if (entry.isFile) {
        const file = await getFile(entry as FileSystemFileEntry)
        // Attach the full path for folder structure building
        Object.defineProperty(file, 'webkitRelativePath', {
          value: entry.fullPath.substring(1), // Remove leading slash
          writable: false
        })
        files.push(file)
      } else if (entry.isDirectory) {
        const subFiles = await readDirectory(entry as FileSystemDirectoryEntry)
        files.push(...subFiles)
      }
    }
  } while (entries.length > 0)
  
  return files
}

export interface ProcessFolderResult {
  success: boolean
  folderName?: string
  structure?: FolderNode
  fileCount?: number
  error?: string
}

/**
 * Process uploaded folder files into a FolderNode structure
 */
export const processUploadedFolder = async (files: FileList): Promise<ProcessFolderResult> => {
  const validFiles: { path: string; file: File; fileType: FileType }[] = []
  
  // Filter to only valid file types
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fileType = isValidFileType(file.name)
    
    if (fileType) {
      // Get the relative path from webkitRelativePath
      const path = (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name
      validFiles.push({ path, file, fileType })
    }
  }

  if (validFiles.length === 0) {
    return {
      success: false,
      error: `No valid files found in folder. Supported types: ${FILE_TYPES.join(', ')}`
    }
  }

  // Build folder structure
  const rootFolderName = validFiles[0].path.split('/')[0] || 'uploaded-folder'
  const root: FolderNode = {
    name: rootFolderName,
    type: 'folder',
    children: []
  }

  for (const { path, file, fileType } of validFiles) {
    const parts = path.split('/')
    let current: FolderNode = root
    
    // Navigate/create folder structure
    for (let i = 1; i < parts.length - 1; i++) {
      const folderName = parts[i]
      let folder = current.children.find(
        (c): c is FolderNode => c.type === 'folder' && c.name === folderName
      )
      if (!folder) {
        folder = { name: folderName, type: 'folder', children: [] }
        current.children.push(folder)
      }
      current = folder
    }

    // Add file
    try {
      const content = await file.text()
      const parsedData = parseFileContent(content, fileType)
      const fileNode: FileNode = {
        name: parts[parts.length - 1],
        type: 'file',
        fileType,
        data: parsedData
      }
      current.children.push(fileNode)
    } catch (error) {
      console.warn(`Failed to parse ${file.name}:`, error)
    }
  }

  // Sort children alphabetically (folders first)
  sortFolderChildren(root)

  return {
    success: true,
    folderName: rootFolderName,
    structure: root,
    fileCount: validFiles.length
  }
}

/**
 * Create a FileList-like object from an array of files
 */
export const createFileListFromArray = (files: File[]): FileList => {
  const fileList = {
    length: files.length,
    item: (i: number) => files[i],
    [Symbol.iterator]: function* () {
      for (let i = 0; i < files.length; i++) yield files[i]
    }
  } as unknown as FileList
  
  // Add indexed access
  files.forEach((file, i) => {
    (fileList as unknown as Record<number, File>)[i] = file
  })
  
  return fileList
}
