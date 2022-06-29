import ErrorPage from "next/error";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const AdminController = (props) => {
  const { Component } = props,
    [auth, setAuth] = useState(false);

  useEffect(() => setAuth(props.status && props.role === "admin"), [props.status]);

  return auth ? Component : <ErrorPage title="Page does not exixt" statusCode={404} />;
};

const mapStateToProps = (state) => ({
    status: state.auth?.status,
    role: state.auth?.role,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminController);
