import type { TreeNode, FileNode, FolderNode } from '../types'
import { countFilesInFolder } from '../utilities/jsonHelpers'

interface FileTreeProps {
  rootNode: FolderNode
  expandedFolders: Set<string>
  selectedFilePath: string
  onToggleFolder: (path: string) => void
  onSelectFile: (file: FileNode, path: string) => void
}

const FileTree = ({
  rootNode,
  expandedFolders,
  selectedFilePath,
  onToggleFolder,
  onSelectFile
}: FileTreeProps) => {
  const renderTreeNode = (node: TreeNode, path: string, depth: number = 0): JSX.Element => {
    const indent = depth * 16

    if (node.type === 'file') {
      const isSelected = selectedFilePath === path
      return (
        <button
          key={path}
          onClick={() => onSelectFile(node, path)}
          style={{ paddingLeft: indent + 8 }}
          className={`w-full flex items-center gap-2 py-1.5 px-2 text-left rounded transition-colors ${
            isSelected 
              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
              : 'hover:bg-neutral-100 dark:hover:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500 dark:text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="truncate text-sm">{node.name}</span>
          <span className="text-xs text-neutral-400 ml-auto">{node.fileType}</span>
        </button>
      )
    }

    const isExpanded = expandedFolders.has(path)
    const fileCount = countFilesInFolder(node)

    return (
      <div key={path}>
        <button
          onClick={() => onToggleFolder(path)}
          style={{ paddingLeft: indent + 8 }}
          className="w-full flex items-center gap-2 py-1.5 px-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700/50 rounded transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 flex-shrink-0 ${isExpanded ? 'text-blue-500' : 'text-blue-400 dark:text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span className="font-medium text-neutral-800 dark:text-neutral-200 text-sm truncate">{node.name}</span>
          <span className="text-xs text-neutral-400 ml-auto">{fileCount} file{fileCount !== 1 ? 's' : ''}</span>
        </button>
        {isExpanded && (
          <div>
            {node.children.map(child => renderTreeNode(child, `${path}/${child.name}`, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="lg:col-span-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 max-h-[600px] overflow-y-auto">
      <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
        Folder Structure
      </h3>
      {renderTreeNode(rootNode, rootNode.name)}
    </div>
  )
}

export default FileTree
