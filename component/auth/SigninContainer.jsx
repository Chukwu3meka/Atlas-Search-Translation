import Router from "next/router";
import { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Signin } from ".";
import validate from "@utils/validator";
import { fetcher } from "@utils/clientFuncs";
import { setAuthAction } from "@store/actions";

const SigninContainer = ({ setAuthAction }) => {
  const { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [values, setValues] = useState({
      showPassword: false,
      email: process.env.NEXT_PUBLIC_EMAIL || "",
      password: process.env.NEXT_PUBLIC_PASSWORD || "",
    });

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
        throw { label: "Invalid Email/Password" };
      }

      await fetcher("/auth/signin", { password, email })
        .then(async ({ name, role }) => {
          if (!name && !role) throw "suspicious token";
          setLoading(false);
          setAuthAction({ name, role, status: true });
          enqueueSnackbar("Signin Successful", { variant: "success" });
          Router.push("/");
        })
        .catch((e) => {
          throw e;
        });
    } catch ({ label }) {
      setLoading(false);
      enqueueSnackbar(label, { variant: "error" });
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
