import { DragEvent } from 'react'
import type { FileType } from '../upload-data-system/types'

interface DropZoneProps {
  isDragging: boolean
  fileTypes: FileType[]
  onDragOver: (e: DragEvent<HTMLDivElement>) => void
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void
  onDrop: (e: DragEvent<HTMLDivElement>) => void
}

const DropZone = ({
  isDragging,
  fileTypes,
  onDragOver,
  onDragLeave,
  onDrop
}: DropZoneProps) => {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-neutral-300 dark:border-neutral-600 hover:border-blue-400 dark:hover:border-blue-500'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mx-auto mb-4 text-neutral-400 dark:text-neutral-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p className="text-neutral-600 dark:text-neutral-400 mb-1">
        Drag and drop files or folders here
      </p>
      <p className="text-sm text-neutral-500 dark:text-neutral-500">
        Supported types: {fileTypes.join(', ')}
      </p>
    </div>
  )
}

export default DropZone
