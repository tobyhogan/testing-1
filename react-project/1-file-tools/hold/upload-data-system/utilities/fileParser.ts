import type { FileType } from '../upload-data-system/types'

export const parseFileContent = (content: string, fileType: FileType): unknown => {
  switch (fileType) {
    case '.json':
      return JSON.parse(content)
    case '.jsonc':
      // Remove comments from JSONC (single-line // and multi-line /* */)
      const jsonWithoutComments = content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
      return JSON.parse(jsonWithoutComments)
    case '.csv':
      // Parse CSV into array of objects
      const lines = content.trim().split('\n')
      if (lines.length < 2) return []
      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
      return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] || ''
          return obj
        }, {} as Record<string, string>)
      })
    case '.txt':
      // Store as text content
      return { textContent: content, lines: content.split('\n') }
    default:
      throw new Error('Unsupported file type')
  }
}
