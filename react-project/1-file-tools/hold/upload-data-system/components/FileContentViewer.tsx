import type { FileNode } from '../types'
import JsonRenderer from './JsonRenderer'

interface FileContentViewerProps {
  selectedFile: FileNode | null
  selectedFilePath: string
  expandedKeys: Set<string>
  onToggleExpand: (key: string) => void
  onExpandAll: () => void
  onCollapseAll: () => void
}

const FileContentViewer = ({
  selectedFile,
  selectedFilePath,
  expandedKeys,
  onToggleExpand,
  onExpandAll,
  onCollapseAll
}: FileContentViewerProps) => {
  if (!selectedFile) {
    return (
      <div className="lg:col-span-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 max-h-[600px] overflow-auto">
        <div className="flex flex-col items-center justify-center h-64 text-neutral-500 dark:text-neutral-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-center">
            Select a file from the folder structure to view its contents
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 max-h-[600px] overflow-auto">
      <div className="mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="font-medium text-neutral-800 dark:text-neutral-200">{selectedFile.name}</h3>
          <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded">
            {selectedFile.fileType}
          </span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{selectedFilePath}</p>
        
        {/* Data controls */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={onExpandAll}
            className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={onCollapseAll}
            className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>
      
      <JsonRenderer
        data={selectedFile.data}
        expandedKeys={expandedKeys}
        onToggleExpand={onToggleExpand}
      />
      
      {/* Raw JSON View */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
          View Raw JSON
        </summary>
        <pre className="mt-2 p-3 bg-neutral-900 text-neutral-100 rounded-lg overflow-x-auto text-xs">
          {JSON.stringify(selectedFile.data, null, 2)}
        </pre>
      </details>
    </div>
  )
}

export default FileContentViewer
