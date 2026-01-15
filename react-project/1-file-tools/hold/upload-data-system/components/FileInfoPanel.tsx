interface FileInfoPanelProps {
  fileName: string
  fileType: string
  uploadedAt: string
}

const FileInfoPanel = ({ fileName, fileType, uploadedAt }: FileInfoPanelProps) => {
  return (
    <div className="mb-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-neutral-500 dark:text-neutral-400">File Name:</span>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">{fileName}</p>
        </div>
        <div>
          <span className="text-neutral-500 dark:text-neutral-400">File Type:</span>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">{fileType}</p>
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

export default FileInfoPanel
