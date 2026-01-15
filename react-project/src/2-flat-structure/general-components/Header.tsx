import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'


const navigationLinks = [
  { path: '/page1', label: 'Page 1' },
  { path: '/page2', label: 'Page 2' },
  { path: '/settings', label: 'Settings' },
]


/*

  { path: '/view-data', label: 'View Data' },
  { path: '/upload', label: 'Upload Data' },
  { path: '/page1', label: 'UnusedLink1' },


*/

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white dark:bg-neutral-800 shadow-md transition-colors">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">

        <Link to="/" className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
          My Website
        </Link>

        <nav className="hidden md:flex space-x-3">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                isActive(link.path) 
                  ? 'bg-blue-100 dark:bg-neutral-700 text-blue-700 dark:text-blue-400' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>

          <svg
            className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          <svg
            className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors whitespace-nowrap ${
                isActive(link.path) 
                  ? 'bg-blue-100 dark:bg-neutral-700 text-blue-700 dark:text-blue-400' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
      </div>

    </header>

  )
}

export default Header
