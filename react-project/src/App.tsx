import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './2-flat-structure/general-components/Header.tsx'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'

//import UploadDataPage from './pages/y-UploadDataPage'
//import DataDisplayingPage from './pages/z-DataDisplayingPage'

import Settings from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>

              <Route path="/" element={<Navigate to="/page1" replace />} />
              
              <Route path="/page1" element={<Page1 />} />
              <Route path="/page2" element={<Page2 />} />
              <Route path="/settings" element={<Settings />} />

            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App



/*

<Route path="/upload" element={<UploadDataPage />} />
<Route path="/view-data" element={<DataDisplayingPage />} />

*/
