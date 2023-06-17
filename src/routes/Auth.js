import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbConfig";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.EmailAuthProvider
    try {
      let data;
      if (newAccount) {
        // create account
        // Creates a new user account associated with email and password
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        // Asynchronously signs in using an email and password
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((previous) => !previous);

  const onSocialClick = async (event) => {
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.AuthProvider
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
        <span onClick={toggleAccount}>
          {newAccount ? "Sign in" : "Create ACcount"}
        </span>
      </form>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
