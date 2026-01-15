import { createContext, useContext, useEffect, useRef, useState } from "react";
import supabase from "../supabaseClient";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  let myChannel = null;
  const [username, setUsername] = useState("");
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [routeHash, setRouteHash] = useState("");


  
  const initializeUser = (session) => {
    setSession(session);
    // const {
    //   data: { session },
    // } = await supabase.auth.getSession();

    let username;
    if (session) {
      username = session.user.user_metadata.user_name;
    } else {
      username = localStorage.getItem("username") || randomUsername();
    }
    setUsername(username);
    localStorage.setItem("username", username);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      initializeUser(session);
    });



    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      initializeUser(session);
    });

    // const { hash, pathname } = window.location;
    // if (hash && pathname === "/") {
    //   console.log("hash", hash);
    //   setRouteHash(hash);
    // }

    return () => {
      // Remove supabase channel subscription by useEffect unmount
      if (myChannel) {
        supabase.removeChannel(myChannel);
      }

      authSubscription.unsubscribe();
    };
  }, []);




  return (
    <AppContext.Provider
      value={{
        loadingInitial,
        error,
        username,
        setUsername,
        routeHash,
        session,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };
