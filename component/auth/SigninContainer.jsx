import { connect } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Signin } from ".";
import validate from "@utils/validator";
import { fetcher } from "@utils/clientFuncs";
import { setTokenAction, setSessionAction } from "@store/actions";

const SigninContainer = ({ setModeHandler, hideProfileMenuHandler, setTokenAction, setSessionAction }) => {
  const router = useRouter(),
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [showPassword, setShowPassword] = useState(false),
    [email, setEmail] = useState(process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_EMAIL : ""),
    [password, setPassword] = useState(process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_PASSWORD : "");

  const signinHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      try {
        validate({ type: "email", value: email });
        validate({
          type: "password",
          value: password,
          attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
        });
      } catch (error) {
        setLoading(false);
        throw { label: "Invalid Email/Password" };
      }

      const { token, session, error } = await fetcher("/auth/signin", { password, email });
      setLoading(false);

      if (session) {
        setSessionAction(session);
        setTokenAction(token);
        hideProfileMenuHandler();
        router.push("/");
      } else {
        throw { label: error };
      }
    } catch (error) {
      setLoading(false);
      if (error && error.label) return enqueueSnackbar(error.label, { variant: "error" });
      enqueueSnackbar("An error occured", { variant: "error" });
    }
  };

  return (
    <Signin
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

const mapStateToProps = (state) => ({}),
  mapDispatchToProps = { setTokenAction, setSessionAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
