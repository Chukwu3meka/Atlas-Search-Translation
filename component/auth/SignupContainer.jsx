import Router from "next/router";
import { useState } from "react";
// import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Signup } from ".";
import validate from "@utils/validator";
// import { setAuthAction } from "@store/actions";
import { fetcher, sleep } from "@utils/clientFuncs";

const SignupContainer = () => {
  const [values, setValues] = useState({
      showPassword: false,
      name: process.env.NEXT_PUBLIC_NAME || "",
      email: process.env.NEXT_PUBLIC_EMAIL || "",
      password: process.env.NEXT_PUBLIC_PASSWORD || "",
    }),
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [showPassword, setShowPassword] = useState(false),
    [name, setName] = useState(process.env.NEXT_PUBLIC_NAME || ""),
    [email, setEmail] = useState(process.env.NEXT_PUBLIC_EMAIL || ""),
    [password, setPassword] = useState(process.env.NEXT_PUBLIC_PASSWORD || "");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues((values) => ({ ...values, showPassword: !values.showPassword }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signupHandler = async () => {
    const { name, email, password } = values;

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
      setValues({ showPassword: false, name: "", email: "", password: "" });
      enqueueSnackbar("A verification link has been sent to your mail", { variant: "info" });

      await sleep(0.3);
      Router.push("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message || error || "Unable to register account", { variant: "error" });
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
        setShowPassword,
        handleChange,
        handleClickShowPassword,
        handleMouseDownPassword,

        values,
      }}
    />
  );
};

// const mapStateToProps = (state) => ({}),
//   mapDispatchToProps = { setAuthAction };

// export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);

export default SignupContainer;
