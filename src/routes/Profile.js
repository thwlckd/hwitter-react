import React from "react";
import { authService } from "../fbConfig";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigator = useNavigate();
  const onLogOutClick = () => {
    authService.signOut().then((res) => navigator("/"));
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
