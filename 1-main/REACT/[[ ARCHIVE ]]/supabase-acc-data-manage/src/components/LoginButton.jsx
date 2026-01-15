
import supabase from "../../supabaseClient";

import { useAppContext } from "../appContext";




export default function LoginButton() {

  const { username, setUsername, randomUsername, session } = useAppContext();

  return (
    <>

      {session ? (
        <>
          <button
            className="p-1 border-2 border-black"
            onClick={() => {
              const { error } = supabase.auth.signOut();
              if (error) return console.error("error signOut", error);
              const username = randomUsername();
              setUsername(username);
              localStorage.setItem("username", username);
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            className="p-1 border-2 border-black"
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "google",
                redirectTo: window.location.origin,
              })
            }
          >
            Sign Up / Login
          </button>
        </>
      )}
    </>
  );
}
