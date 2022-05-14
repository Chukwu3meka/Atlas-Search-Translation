import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import { fetcher } from "@utils/clientFuncs";
import Typography from "@mui/material/Typography";
import { ButtonGroup } from "@mui/material";
import Link from "next/link";

const NotAuthenticated = () => {
  const [authMode, setAuthMode] = useState("signin");

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const signinJsx = [
    authMode === "signup" && { id: "name", value: name, onChangeHandler: setName, label: "Name" },
    { id: "email", value: email, onChangeHandler: setEmail, label: "eMail" },
    authMode !== "reset" && { id: "password", value: password, onChangeHandler: setPassword, label: "Password" },
  ];

  const signinHandler = () => {
    if (authMode !== "signin") return setAuthMode("signin");
  };

  const signupHandler = () => {
    if (authMode !== "signup") return setAuthMode("signup");
  };

  const resetHandler = () => {
    if (authMode !== "reset") return setAuthMode("reset");
  };

  return (
    <>
      <Typography variant="body1" sx={{ letterSpacing: 1, fontWeight: "bold", textAlign: "center", px: 1, py: 2 }}>
        {authMode === "signin" ? "SIGN IN TO YOUR ACCOUNT" : authMode === "signup" ? "WELCOME TO OPENTRANSLATION" : "FORGOT PASSWORD"}
      </Typography>
      {signinJsx.map(
        ({ id, value, onChangeHandler, label }) =>
          id && (
            <TextField
              key={id}
              fullWidth
              label={label}
              value={value}
              variant="outlined"
              sx={{ marginBottom: 1, minWidth: 290 }}
              onChange={(e) => onChangeHandler(e.target.value)}
            />
          )
      )}

      <ButtonGroup fullWidth>
        <Button variant="contained" color="info" sx={{ textTransform: "capitalize" }} onClick={signupHandler}>
          Sign Up
        </Button>

        {authMode === "reset" ? (
          <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={resetHandler}>
            Reset
          </Button>
        ) : (
          <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={signinHandler}>
            Sign In
          </Button>
        )}
      </ButtonGroup>

      {/* <Link href="/auth/resetPassword" > */}
      {authMode !== "reset" ? (
        <Typography
          onClick={resetHandler}
          variant="body1"
          fontSize={13}
          sx={{ letterSpacing: 1, fontWeight: "bold", textAlign: "center", p: 1, cursor: "pointer" }}>
          Forgot your password?
        </Typography>
      ) : (
        <Typography
          variant="body1"
          fontSize={13}
          sx={{ letterSpacing: 1, fontWeight: "bold", textAlign: "center", p: 1, cursor: "pointer" }}>
          Please enter your email address
        </Typography>
      )}
    </>
  );
};

export default NotAuthenticated;
