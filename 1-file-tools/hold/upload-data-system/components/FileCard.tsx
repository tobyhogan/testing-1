import type { ExampleFile } from '../data/exampleFiles'

interface FileCardProps {
  example: ExampleFile
  onLoad: (example: ExampleFile) => void
}

const FileCard = ({ example, onLoad }: FileCardProps) => {
  return (
    <button
      onClick={() => onLoad(example)}
      className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-left hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          example.type === '.json' 
            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
            {example.name}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {example.type}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {example.description}
          </p>
        </div>
      </div>
    </button>
  )
}

export default FileCard
