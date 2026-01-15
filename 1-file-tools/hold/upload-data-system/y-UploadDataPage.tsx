import { useState, useRef, DragEvent, ChangeEvent } from 'react'

// Types
import type { UploadStatus } from './types'

// Utilities
import { FILE_TYPES, isValidFileType } from './utilities/fileTypes'
import { parseFileContent } from './utilities/fileParser'
import { saveFileToStorage, saveFolderToStorage, hasStoredData, clearStorage } from './utilities/storageHelpers'
import { processUploadedFolder, readDirectory, createFileListFromArray } from './utilities/folderProcessor'

// Data
import { exampleFiles, ExampleFile } from './data/exampleFiles'
import { exampleFolders, ExampleFolder } from './data/exampleFolders'

// Components
import DropZone from './components/DropZone'
import StatusMessage from './components/StatusMessage'
import SupportedFormatsInfo from './components/SupportedFormatsInfo'
import FileCard from './components/FileCard'
import FolderCard from './components/FolderCard'
import UploadButtons from './components/UploadButtons'

// Re-export types for backward compatibility
export type { FileNode, FolderNode, TreeNode, StoredFileData, StoredFolderData, StoredData } from './types'

const UploadDataPage = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ type: null, message: '' })
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const processFile = async (file: File) => {
    const detectedFileType = isValidFileType(file.name)

    if (!detectedFileType) {
      setUploadStatus({
        type: 'error',
        message: `Unsupported file type. Supported types: ${FILE_TYPES.join(', ')}`
      })
      return
    }

    try {
      const content = await file.text()
      const parsedData = parseFileContent(content, detectedFileType)
      saveFileToStorage(file.name, detectedFileType, parsedData)
      
      setFileName(file.name)
      setUploadStatus({
        type: 'success',
        message: `Successfully uploaded and stored "${file.name}"`
      })
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: `Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    }
  }

  const processFolder = async (files: FileList) => {
    const result = await processUploadedFolder(files)
    
    if (!result.success) {
      setUploadStatus({ type: 'error', message: result.error || 'Failed to process folder' })
      return
    }

    saveFolderToStorage(result.folderName!, result.structure!)
    setFileName(result.folderName!)
    setUploadStatus({
      type: 'success',
      message: `Successfully uploaded folder "${result.folderName}" with ${result.fileCount} file(s)`
    })
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const firstFile = files[0] as File & { webkitRelativePath?: string }
    const isFromFolderInput = firstFile.webkitRelativePath && firstFile.webkitRelativePath.includes('/')
    
    if (isFromFolderInput) {
      processFolder(files)
    } else {
      processFile(files[0])
    }
    
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (folderInputRef.current) folderInputRef.current.value = ''
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const items = e.dataTransfer.items
    const files = e.dataTransfer.files
    
    if (items && items.length > 0) {
      const item = items[0]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entry = (item as any).webkitGetAsEntry?.()
      
      if (entry?.isDirectory) {
        try {
          setUploadStatus({ type: null, message: '' })
          const allFiles = await readDirectory(entry as FileSystemDirectoryEntry)
          if (allFiles.length > 0) {
            processFolder(createFileListFromArray(allFiles))
          }
        } catch (error) {
          setUploadStatus({
            type: 'error',
            message: `Failed to read folder: ${error instanceof Error ? error.message : 'Unknown error'}`
          })
        }
        return
      }
    }
    
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const handleClearData = () => {
    clearStorage()
    setFileName(null)
    setUploadStatus({
      type: 'success',
      message: 'Stored data cleared successfully'
    })
  }

  const loadExampleFile = (example: ExampleFile) => {
    saveFileToStorage(example.name, example.type, example.data)
    setFileName(example.name)
    setUploadStatus({
      type: 'success',
      message: `Successfully loaded example file "${example.name}"`
    })
  }

  const loadExampleFolder = (example: ExampleFolder) => {
    saveFolderToStorage(example.name, example.structure)
    setFileName(example.name)
    setUploadStatus({
      type: 'success',
      message: `Successfully loaded example folder "${example.name}"`
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 mb-6">
        Upload Data
      </h1>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={FILE_TYPES.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {/* Hidden Folder Input */}
      <input
        ref={folderInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        {...{ webkitdirectory: '', directory: '' } as React.InputHTMLAttributes<HTMLInputElement>}
        multiple
      />

      {/* Upload Buttons */}
      <UploadButtons
        onFileClick={() => fileInputRef.current?.click()}
        onFolderClick={() => folderInputRef.current?.click()}
      />

      {/* Drop Zone */}
      <DropZone
        isDragging={isDragging}
        fileTypes={FILE_TYPES}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />

      {/* Status Message */}
      <StatusMessage status={uploadStatus} />

      {/* Current File Info */}
      {fileName && (
        <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Current file: <span className="font-medium text-neutral-800 dark:text-neutral-200">{fileName}</span>
          </p>
        </div>
      )}

      {/* Clear Data Button */}
      {hasStoredData() && (
        <div className="mt-6">
          <button
            onClick={handleClearData}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Clear Stored Data
          </button>
        </div>
      )}

      {/* Supported Formats */}
      <SupportedFormatsInfo />

      {/* Example Files Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-50 mb-4">
          Example Files
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Click on any example file below to load it as sample data:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exampleFiles.map((example) => (
            <FileCard key={example.name} example={example} onLoad={loadExampleFile} />
          ))}
        </div>
      </div>

      {/* Example Folders Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-50 mb-4">
          Example Folders
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Click on any example folder below to load it with its nested file structure:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exampleFolders.map((example) => (
            <FolderCard key={example.name} example={example} onLoad={loadExampleFolder} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UploadDataPage
