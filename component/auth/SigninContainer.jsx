import Router from "next/router";
import { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import { Signin } from ".";
import validate from "@utils/validator";
import { setAuthAction } from "@store/actions";
import { fetcher, setFetcherToken } from "@utils/clientFuncs";

const SigninContainer = ({ setAuthAction }) => {
  const [values, setValues] = useState({
      showPassword: false,
      email: process.env.NEXT_PUBLIC_EMAIL || "",
      password: process.env.NEXT_PUBLIC_PASSWORD || "",
    }),
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [cookies, setCookie] = useCookies(["token"]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues((values) => ({ ...values, showPassword: !values.showPassword }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signinHandler = async (e) => {
    setLoading(true);

    const { email, password } = values;

    try {
      try {
        validate({ type: "email", value: email });
        validate({
          type: "password",
          value: password,
          attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
        });
      } catch (error) {
        throw { message: "Invalid Email/Password" };
      }

      await fetcher("/auth/signin", { password, email })
        .then(async ({ name, role, token }) => {
          if (!name && !role && !token) throw "suspicious token";
          // setAuthAction(); // <= to prevent infinite loading

          setFetcherToken(token);

          setCookie("token", token, { path: "/", secure: process.env.NODE_ENV === "production" });

          setAuthAction({ name, role, status: true });
          setLoading(false);
          enqueueSnackbar("Signin Successful", { variant: "success" });

          Router.push("/");
        })
        .catch((e) => {
          throw e;
        });
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message || error || "Unable to signin", { variant: "error" });
    }
  };

  return (
    <Signin
      {...{
        values,
        loading,
        handleChange,
        signinHandler,
        handleClickShowPassword,
        handleMouseDownPassword,
      }}
    />
  );
};

const mapStateToProps = (state) => ({}),
  mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
