import { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import { Signin } from ".";
import validate from "@utils/validator";
import { fetcher, setFetcherToken } from "@utils/clientFuncs";
import { setAuthAction } from "@store/actions";

const SigninContainer = ({ setModeHandler, hideProfileMenuHandler, setAuthAction }) => {
  const { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [cookies, setCookie] = useCookies(["token"]),
    [showPassword, setShowPassword] = useState(false),
    [email, setEmail] = useState(process.env.NEXT_PUBLIC_EMAIL || ""),
    [password, setPassword] = useState(process.env.NEXT_PUBLIC_PASSWORD || "");

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

      await fetcher("/auth/signin", { password, email })
        .then(async ({ name, role, token }) => {
          if (!name && !role && !token) throw "suspicious token";

          setFetcherToken(token);

          setCookie("token", token, { path: "/", secure: process.env.NODE_ENV === "production" });

          setAuthAction({ name, role, status: true });

          hideProfileMenuHandler();
          setLoading(false);
          enqueueSnackbar("Signin Successful", { variant: "success" });
        })
        .catch((e) => {
          setLoading(false);
          throw e;
        });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.label || error || "Unable to signin");
      return;
      enqueueSnackbar(error.label || error || "Unable to signin", { variant: "error" });
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
  mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
