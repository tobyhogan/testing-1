import { useTheme } from '../contexts/ThemeContext'
import { useDocumentTitle } from '../../src/2-flat-structure/hooks/useDocumentTitle.ts'

const Settings = () => {
  useDocumentTitle('Settings')
  const { theme, toggleTheme, uiScale, setUIScale } = useTheme()

  const scaleOptions = [
    { value: '150', label: '150%' },
    { value: '133', label: '133%' },
    { value: '100', label: '100%' },
    { value: '90', label: '90%' },
    { value: '80', label: '80%' },
    { value: '75', label: '75%' },
  ] as const

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-50">
        Settings
      </h1>

      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
              Appearance
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  Theme
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Switch between light and dark mode
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 dark:focus:ring-offset-neutral-800 ${
                  theme === 'dark'
                    ? 'bg-neutral-600'
                    : 'bg-neutral-300'
                }`}
                aria-label="Toggle theme"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                    theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
              Current theme: <span className="font-medium capitalize">{theme}</span>
            </div>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
              Display
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  UI Scale
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Adjust the size of the interface
                </p>
              </div>

              <select
                value={uiScale}
                onChange={(e) => setUIScale(e.target.value as '150' | '133' | '100' | '90' |'80' | '75')}
                className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 cursor-pointer"
              >
                {scaleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
              Current scale: <span className="font-medium">{uiScale}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
