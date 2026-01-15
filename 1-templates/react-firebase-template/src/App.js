import './App.css';

import { signOut } from 'firebase/auth';

import { auth } from './firebase-config';

function App() {

  const [isAuth, setIsAuth] = useState(false); // used to check if the user is logged in already or not

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    })
  };

  return (
    <div className="App">
      <h1>test</h1>


    </div>
  );
}

export default App;
