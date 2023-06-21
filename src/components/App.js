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
        if (user.displayName === null) {
          user.updateProfile({
            displayName: "홍길동",
          });
        }
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing.."
      )}
      <footer>&copy: Hwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
