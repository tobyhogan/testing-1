import type { TreeNode, FolderNode } from '../types'

/**
 * Collect all keys from an object (for expand all functionality)
 */
export const collectAllKeys = (obj: unknown, prefix = ''): Set<string> => {
  const keys = new Set<string>()
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      const fullKey = prefix ? `${prefix}.${key}` : key
      keys.add(fullKey)
      const childKeys = collectAllKeys((obj as Record<string, unknown>)[key], fullKey)
      childKeys.forEach(k => keys.add(k))
    })
  }
  return keys
}

/**
 * Collect all folder paths from the tree structure
 */
export const collectAllFolderPaths = (node: TreeNode, path: string): Set<string> => {
  const paths = new Set<string>()
  if (node.type === 'folder') {
    paths.add(path)
    node.children.forEach(child => {
      const childPaths = collectAllFolderPaths(child, `${path}/${child.name}`)
      childPaths.forEach(p => paths.add(p))
    })
  }
  return paths
}

/**
 * Count total files in a folder (recursively)
 */
export const countFilesInFolder = (node: FolderNode): number => {
  let count = 0
  for (const child of node.children) {
    if (child.type === 'file') count++
    else count += countFilesInFolder(child)
  }
  return count
}
