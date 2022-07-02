import { useState } from "react";
import { useSnackbar } from "notistack";

import { Reset } from ".";
import validate from "@utils/validator";
import { fetcher } from "@utils/clientFuncs";

const ResetContainer = ({ setModeHandler, hideProfileMenuHandler }) => {
  const { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [showPassword, setShowPassword] = useState(false),
    [email, setEmail] = useState(process.env.NEXT_PUBLIC_EMAIL || ""),
    [password, setPassword] = useState(process.env.NEXT_PUBLIC_PASSWORD || "");

  const signinHandler = async () => {
    setLoading(true);
    try {
      validate({ type: "email", value: email });
      validate({
        type: "password",
        value: password,
        attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
      });

      const { token, error } = await fetcher("/auth/signup", { password, email });

      setLoading(false);
      if (status) {
        hideProfileMenuHandler();
        // enqueueSnackbar("A verification link has been sent to your mail", { variant: "info" });
      } else {
        throw { message: error };
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error && error.message) return enqueueSnackbar(error.message, { variant: "error" });
      enqueueSnackbar("An error occured", { variant: "error" });
    }
  };

  return (
    <Reset
      {...{
        email,
        loading,
        setEmail,
        password,
        setPassword,
        showPassword,
        signinHandler,
        setModeHandler,
        setShowPassword,
      }}
    />
  );
};

export default ResetContainer;
