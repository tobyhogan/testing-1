import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
    
    
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="min-h-screen bg-gray-50">

        <Header />

        <main className="container mx-auto px-4 py-8">
          
          <Routes>

            <Route path="/" element={<Navigate to="/page1" replace />} />

            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />

          </Routes>

        </main>
      </div>
    </Router>