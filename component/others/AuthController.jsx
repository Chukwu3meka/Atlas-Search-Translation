import ErrorPage from "next/error";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const AuthController = (props) => {
  const { Component } = props,
    [auth, setAuth] = useState(false);

  useEffect(() => setAuth(props.status && props.role === "admin"), [props.status]);

  return auth ? Component : <ErrorPage title="Page does not exixt" statusCode={404} />;
};

const mapStateToProps = (state) => ({
    role: state.auth?.role,
    status: state.auth?.status,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthController);
