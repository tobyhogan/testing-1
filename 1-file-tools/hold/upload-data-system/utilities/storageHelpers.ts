import type { StoredData, StoredFileData, StoredFolderData, FolderNode } from '../types'
import { STORAGE_KEY } from './fileTypes'

export const saveFileToStorage = (
  fileName: string,
  fileType: string,
  data: unknown
): StoredFileData => {
  const storageData: StoredFileData = {
    fileName,
    fileType,
    data,
    uploadedAt: new Date().toISOString(),
    isFolder: false
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))
  return storageData
}

export const saveFolderToStorage = (
  folderName: string,
  structure: FolderNode
): StoredFolderData => {
  const storageData: StoredFolderData = {
    folderName,
    structure,
    uploadedAt: new Date().toISOString(),
    isFolder: true
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))
  return storageData
}

export const loadFromStorage = (): StoredData | null => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredData
  } catch {
    return null
  }
}

export const clearStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}

export const hasStoredData = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null
}

export const isStoredFolder = (data: StoredData): data is StoredFolderData => {
  return 'isFolder' in data && data.isFolder === true
}
