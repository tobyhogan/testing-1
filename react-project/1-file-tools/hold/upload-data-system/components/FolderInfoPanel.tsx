interface FolderInfoPanelProps {
  folderName: string
  totalFiles: number
  uploadedAt: string
}

const FolderInfoPanel = ({ folderName, totalFiles, uploadedAt }: FolderInfoPanelProps) => {
  return (
    <div className="mb-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-neutral-500 dark:text-neutral-400">Folder Name:</span>
          <p className="font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            {folderName}
          </p>
        </div>
        <div>
          <span className="text-neutral-500 dark:text-neutral-400">Total Files:</span>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            {totalFiles} file{totalFiles !== 1 ? 's' : ''}
          </p>
        </div>
        <div>
          <span className="text-neutral-500 dark:text-neutral-400">Uploaded:</span>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            {new Date(uploadedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FolderInfoPanel
