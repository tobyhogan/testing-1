import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Types
import type { StoredData, StoredFileData, StoredFolderData, FileNode } from './types'

// Utilities
import { loadFromStorage, isStoredFolder } from './utilities/storageHelpers'
import { collectAllKeys, collectAllFolderPaths, countFilesInFolder } from './utilities/jsonHelpers'

// Config
import { DEFAULT_JSON_EXPANDED, DEFAULT_FOLDERS_EXPANDED } from '../../../src/config/defaults'

// Components
import EmptyDataState from './components/EmptyDataState'
import FileInfoPanel from './components/FileInfoPanel'
import FolderInfoPanel from './components/FolderInfoPanel'
import FileTree from './components/FileTree'
import FileContentViewer from './components/FileContentViewer'
import JsonRenderer from './components/JsonRenderer'

const DataDisplayingPage = () => {
  const [storedData, setStoredData] = useState<StoredData | null>(null)
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [selectedFilePath, setSelectedFilePath] = useState<string>('')

  useEffect(() => {
    const loadData = () => {
      const parsed = loadFromStorage()
      setStoredData(parsed)
      
      if (parsed) {
        // If DEFAULT_JSON_EXPANDED is true and it's a single file, expand all keys
        if (DEFAULT_JSON_EXPANDED && !isStoredFolder(parsed)) {
          const fileData = parsed as StoredFileData
          if (fileData.data) {
            setExpandedKeys(collectAllKeys(fileData.data))
          }
        }
        
        // If DEFAULT_FOLDERS_EXPANDED is true and it's a folder, expand all folders
        if (DEFAULT_FOLDERS_EXPANDED && isStoredFolder(parsed)) {
          const folderData = parsed as StoredFolderData
          setExpandedFolders(collectAllFolderPaths(folderData.structure, folderData.structure.name))
        }
      }
    }

    loadData()

    window.addEventListener('storage', loadData)
    return () => window.removeEventListener('storage', loadData)
  }, [])

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const expandAll = () => {
    const dataToExpand = selectedFile 
      ? selectedFile.data 
      : (storedData && !isStoredFolder(storedData) ? (storedData as StoredFileData).data : null)
    if (dataToExpand) {
      setExpandedKeys(collectAllKeys(dataToExpand))
    }
  }

  const collapseAll = () => {
    setExpandedKeys(new Set())
  }

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  const expandAllFolders = () => {
    if (!storedData || !isStoredFolder(storedData)) return
    const folderData = storedData as StoredFolderData
    setExpandedFolders(collectAllFolderPaths(folderData.structure, folderData.structure.name))
  }

  const collapseAllFolders = () => {
    setExpandedFolders(new Set())
    setSelectedFile(null)
    setSelectedFilePath('')
  }

  const selectFile = (file: FileNode, path: string) => {
    setSelectedFile(file)
    setSelectedFilePath(path)
    if (DEFAULT_JSON_EXPANDED && file.data) {
      setExpandedKeys(collectAllKeys(file.data))
    } else {
      setExpandedKeys(new Set())
    }
  }

  // Empty state
  if (!storedData) {
    return <EmptyDataState />
  }

  // Folder View
  if (isStoredFolder(storedData)) {
    const folderData = storedData as StoredFolderData
    const totalFiles = countFilesInFolder(folderData.structure)
    
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 mb-6">
          View Data
        </h1>

        <FolderInfoPanel
          folderName={folderData.folderName}
          totalFiles={totalFiles}
          uploadedAt={folderData.uploadedAt}
        />

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={expandAllFolders}
            className="px-3 py-1.5 text-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Expand All Folders
          </button>
          <button
            onClick={collapseAllFolders}
            className="px-3 py-1.5 text-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Collapse All
          </button>
          <Link
            to="/upload"
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Upload New Data
          </Link>
        </div>

        {/* Folder + File Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <FileTree
            rootNode={folderData.structure}
            expandedFolders={expandedFolders}
            selectedFilePath={selectedFilePath}
            onToggleFolder={toggleFolder}
            onSelectFile={selectFile}
          />

          <FileContentViewer
            selectedFile={selectedFile}
            selectedFilePath={selectedFilePath}
            expandedKeys={expandedKeys}
            onToggleExpand={toggleExpand}
            onExpandAll={expandAll}
            onCollapseAll={collapseAll}
          />
        </div>
      </div>
    )
  }

  // Single File View
  const fileData = storedData as StoredFileData

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 mb-6">
        View Data
      </h1>

      <FileInfoPanel
        fileName={fileData.fileName}
        fileType={fileData.fileType}
        uploadedAt={fileData.uploadedAt}
      />

      {/* Controls */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={expandAll}
          className="px-3 py-1.5 text-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="px-3 py-1.5 text-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
        >
          Collapse All
        </button>
        <Link
          to="/upload"
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Upload New Data
        </Link>
      </div>

      {/* Data Display */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 overflow-x-auto">
        <JsonRenderer
          data={fileData.data}
          expandedKeys={expandedKeys}
          onToggleExpand={toggleExpand}
        />
      </div>

      {/* Raw JSON View */}
      <details className="mt-6">
        <summary className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
          View Raw JSON
        </summary>
        <pre className="mt-2 p-4 bg-neutral-900 text-neutral-100 rounded-lg overflow-x-auto text-sm">
          {JSON.stringify(fileData.data, null, 2)}
        </pre>
      </details>
    </div>
  )
}

export default DataDisplayingPage
