import { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbConfig";

function App() {
  // .currentUser -> get the currently signed-in user, not signed in currentUser is null
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
