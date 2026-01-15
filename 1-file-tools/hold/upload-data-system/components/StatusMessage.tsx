import type { UploadStatus } from '../upload-data-system/types'

interface StatusMessageProps {
  status: UploadStatus
}

const StatusMessage = ({ status }: StatusMessageProps) => {
  if (!status.type) return null

  return (
    <div
      className={`mt-4 p-4 rounded-lg ${
        status.type === 'success'
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      }`}
    >
      {status.message}
    </div>
  )
}

export default StatusMessage
