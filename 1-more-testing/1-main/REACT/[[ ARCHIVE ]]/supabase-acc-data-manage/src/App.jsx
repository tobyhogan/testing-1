
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppContextProvider, useAppContext } from "./appContext";

import './dist/output.css';

import LoginButton from './components/LoginButton';

import Account from './pages/Account'
import Home from './pages/Home'
import Stats from './pages/Stats'



function App() {
  const { username, setUsername, session, routeHash } = useAppContext();


  if (routeHash) {
    if (routeHash.endsWith("&type=recovery")) {
      window.location.replace(`/login/${routeHash}`);
    }
    if (routeHash.startsWith("#error_code=404"))
      return (
        <div>
          <p>This link has expired</p>
          <a href="/" style={{ cursor: "pointer" }} variant="link">
            Back to app
          </a>
        </div>
      );
  }
  return (
    <AppContextProvider>
      <Router>
        <nav className="flex justify-between p-3 border-2 border-black">
          <Link to="/" className='mr-6 text-4xl'>Habitazen</Link>
          <div className="">
            <Link to="/" className='mr-6 text-2xl'>Home</Link>
            <Link to="/stats" className=' mr-6 text-2xl'>Stats</Link>
            { true ? <Link to="/account" className=' mr-6 text-2xl'>Account</Link> : null }
            <LoginButton />
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/account" element={<Account></Account>} /> 
          <Route path="/stats" element={<Stats></Stats>} /> 
        </Routes>
      </Router>
    </AppContextProvider>

  );
}

export default App;
