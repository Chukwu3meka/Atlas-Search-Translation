import { useState } from "react";
import { useSnackbar } from "notistack";

import { Signup } from ".";
import validate from "@utils/validator";
import { fetcher } from "@utils/clientFuncs";

const SignupContainer = ({ setModeHandler, hideProfileMenuHandler }) => {
  const { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [showPassword, setShowPassword] = useState(false),
    [name, setName] = useState(process.env.NODE_ENV === "development" ? process.env.NAME : ""),
    [email, setEmail] = useState(process.env.NODE_ENV === "development" ? process.env.EMAIL : ""),
    [password, setPassword] = useState(process.env.NODE_ENV === "development" ? process.env.PASSWORD : "");

  const signupHandler = async () => {
    setLoading(true);
    try {
      validate({ type: "handle", value: name, label: "Name", attributes: ["hasRange(3,30)"] });
      validate({ type: "email", value: email });
      validate({
        type: "password",
        value: password,
        attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
      });

      await fetcher("/auth/signup", { password, email, name });

      setLoading(false);
      hideProfileMenuHandler();
      enqueueSnackbar("A verification link has been sent to your mail", { variant: "info" });
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.label || error || "Unable to register account", { variant: "error" });
    }
  };

  return (
    <Signup
      {...{
        name,
        email,
        loading,
        setName,
        setEmail,
        password,
        setPassword,
        showPassword,
        signupHandler,
        setModeHandler,
        setShowPassword,
      }}
    />
  );
};

export default SignupContainer;
