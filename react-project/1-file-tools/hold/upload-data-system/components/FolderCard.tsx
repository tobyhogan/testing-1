import type { ExampleFolder } from '../data/exampleFolders'

interface FolderCardProps {
  example: ExampleFolder
  onLoad: (example: ExampleFolder) => void
}

const FolderCard = ({ example, onLoad }: FolderCardProps) => {
  return (
    <button
      onClick={() => onLoad(example)}
      className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-left hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
            {example.name}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            folder
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {example.description}
          </p>
        </div>
      </div>
    </button>
  )
}

export default FolderCard
