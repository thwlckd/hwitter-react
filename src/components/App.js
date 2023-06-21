import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbConfig";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // observer for changes to the user's sign-in state
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing.."}
      <footer>&copy: Hwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
