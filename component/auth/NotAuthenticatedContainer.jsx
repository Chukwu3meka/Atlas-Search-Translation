import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";

import { fetcher } from "@utils/clientFuncs";
import Typography from "@mui/material/Typography";
import { ButtonGroup, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import validate from "@utils/validator";
import { SignupContainer } from ".";

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
// import Typography from "@mui/material/Typography";
// import ButtonGroup from "@mui/material/ButtonGroup";

const NotAuthenticated = ({ hideProfileMenuHandler }) => {
  const [authMode, setAuthMode] = useState("signup");

  const [password, setPassword] = useState(process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_PASSWORD : "");
  const [email, setEmail] = useState(process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_EMAIL : "");
  const [name, setName] = useState(process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_NAME : "");

  const { enqueueSnackbar } = useSnackbar();

  const setModeHandler = (mode) => () => setAuthMode(mode);

  const [showPassword, setShowPassword] = useState(false);

  const signinHandler = async () => {
    if (authMode !== "signin") return setAuthMode("signin");

    if (!email || !password) return enqueueSnackbar("Email/Password cannot be empty", { variant: "error" });

    if (!validate("email", email) || !validate("text", password))
      return enqueueSnackbar("Email/Password is incorrect", { variant: "error" });

    const { token } = await fetcher("/profile/signin", { password, email });

    //   await API("post", `company/signin`, { password, email })
    //     .then((id) => {
    //       setProfileAction({ id });
    //       setAuth(true);
    //       enqueueSnackbar("Logged In", { variant: "success" });
    //     })
    //     .catch((err) => {
    //       enqueueSnackbar("Wrong Details", { variant: "error" });
    //     });
    // }
  };

  const signupHandler = async () => {
    try {
      if (authMode !== "signup") return setAuthMode("signup");

      validate({ type: "handle", value: name, label: "Name", attributes: ["hasRange(3,30)"] });
      validate({ type: "email", value: email });
      validate({
        type: "password",
        value: password,
        attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
      });

      const { status, error } = await fetcher("/profile/signup", { password, email, name });

      if (status) {
        enqueueSnackbar("A verification link has been sent to your mail", { variant: "info" });
      } else {
        throw { message: error };
      }
    } catch (error) {
      if (error && error.message) return enqueueSnackbar(error.message, { variant: "error" });
      enqueueSnackbar("An error occured", { variant: "error" });
    }
  };

  const resetHandler = () => {
    if (authMode !== "reset") return setAuthMode("reset");
  };

  return (
    <>
      {authMode === "signup" ? (
        <SignupContainer setModeHandler={setModeHandler} hideProfileMenuHandler={hideProfileMenuHandler} />
      ) : (
        "signin"
      )}

      {/* <Stack
        // variant="outlined"
        // size="small"
        direction={{ xs: "column", sm: "row" }}
        // ori

        spacing={1}

        // sx={{ display: { xl: 'none', xs: 'block' } }} />
        //
      >
        {["signup", "signin", "reset"].map((mode) =>
          authMode === mode ? (
            ""
          ) : (
            <Button fullWidth onClick={() => setAuthMode(mode)} key={mode} variant="outlined" color="warning">
              {mode}
            </Button>
          )
        )}
      </Stack> */}

      {/* <Link href="/auth/resetPassword">
        <Typography
          onClick={resetHandler}
          variant="body1"
          fontSize={13}
          sx={{ letterSpacing: 1, fontWeight: "bold", textAlign: "center", p: 1, cursor: "pointer" }}>
          Forgot your password?
        </Typography>
      </Link> */}
    </>
  );

  return (
    <>
      <Typography variant="body1" sx={{ letterSpacing: 1, fontWeight: "bold", textAlign: "center", px: 1, py: 2 }}>
        {authMode === "signin" ? "SIGN IN TO YOUR ACCOUNT" : authMode === "signup" ? "WELCOME TO OPENTRANSLATION" : "FORGOT PASSWORD"}
      </Typography>
      {authMode === "signup" && (
        <TextField
          id="name"
          fullWidth
          label="Name"
          value={name}
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <TextField
        id="email"
        fullWidth
        label="eMail"
        value={email}
        variant="outlined"
        sx={{ marginBottom: 1 }}
        onChange={(e) => setEmail(e.target.value)}
      />

      {authMode !== "reset" && (
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="ViewCrunch"
            sx={{ marginBottom: 1 }}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      )}
      <ButtonGroup fullWidth>
        {authMode === "signin" ? (
          <Button variant="contained" color="info" sx={{ textTransform: "capitalize" }} onClick={signupHandler}>
            Sign Up
          </Button>
        ) : (
          <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={signinHandler}>
            Sign In
          </Button>
        )}
        {authMode === "reset" ? (
          <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={resetHandler}>
            Reset
          </Button>
        ) : authMode === "signin" ? (
          <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={signinHandler}>
            Sign In
          </Button>
        ) : (
          <Button variant="contained" color="info" sx={{ textTransform: "capitalize" }} onClick={signupHandler}>
            Sign Up
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
