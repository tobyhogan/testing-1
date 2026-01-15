import { Link } from 'react-router-dom'

const EmptyDataState = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 mb-6">
        View Data
      </h1>
      
      <div className="text-center py-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto mb-4 text-neutral-400 dark:text-neutral-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          No data has been uploaded yet.
        </p>
        <Link
          to="/upload"
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Upload Data
        </Link>
      </div>
    </div>
  )
}

export default EmptyDataState
