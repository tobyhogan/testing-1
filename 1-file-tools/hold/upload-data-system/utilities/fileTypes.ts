import type { FileType } from '../upload-data-system/types'

export const STORAGE_KEY = 'uploadedData'

export const FILE_TYPES: FileType[] = ['.json', '.jsonc', '.csv', '.txt']

export const isValidFileType = (fileName: string): FileType | null => {
  const ext = '.' + fileName.split('.').pop()?.toLowerCase()
  if (FILE_TYPES.includes(ext as FileType)) {
    return ext as FileType
  }
  return null
}
