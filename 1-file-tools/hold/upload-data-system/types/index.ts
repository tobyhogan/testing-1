export type FileType = '.json' | '.jsonc' | '.csv' | '.txt'

export interface FileNode {
  name: string
  type: 'file'
  fileType: FileType
  data: unknown
}

export interface FolderNode {
  name: string
  type: 'folder'
  children: (FileNode | FolderNode)[]
}

export type TreeNode = FileNode | FolderNode

export interface StoredFolderData {
  folderName: string
  structure: FolderNode
  uploadedAt: string
  isFolder: true
}

export interface StoredFileData {
  fileName: string
  fileType: string
  data: unknown
  uploadedAt: string
  isFolder?: false
}

export type StoredData = StoredFileData | StoredFolderData

export interface UploadStatus {
  type: 'success' | 'error' | null
  message: string
}
