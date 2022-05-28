import { useState } from "react";

import { SignupContainer, SigninContainer, ResetContainer } from ".";

const NotAuthenticated = ({ hideProfileMenuHandler }) => {
  const [authMode, setAuthMode] = useState("signin");

  const setModeHandler = (mode) => () => setAuthMode(mode);

  return (
    <>
      {authMode === "signup" ? (
        <SignupContainer setModeHandler={setModeHandler} hideProfileMenuHandler={hideProfileMenuHandler} />
      ) : authMode === "signin" ? (
        <SigninContainer setModeHandler={setModeHandler} hideProfileMenuHandler={hideProfileMenuHandler} />
      ) : (
        <ResetContainer setModeHandler={setModeHandler} hideProfileMenuHandler={hideProfileMenuHandler} />
      )}
    </>
  );
};

export default NotAuthenticated;
