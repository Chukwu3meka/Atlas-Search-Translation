import { useState } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { ExitToAppOutlined } from "@mui/icons-material";
import { Avatar, Typography, Button } from "@mui/material";

import { setAuthAction } from "@store/actions";
import { useCookies } from "react-cookie";
import { setFetcherToken } from "@utils/clientFuncs";

const Authenticated = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    { auth, setAuthAction, hideProfileMenuHandler } = props,
    [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // useState(() => {
  //   // setAuth({ ...props.auth });
  //   if (!props.auth.name) {
  //     console.log("reload");
  //     Router.reload(window.location.pathname);
  //   }
  //   // return () => setAuth({}); // <= cleanup function
  // }, [props.auth]);

  const logoutHandler = async () => {
    setFetcherToken(null); // <= remove token from axios header
    removeCookie("token", { path: "/" }); // <= delete cookie from device
    hideProfileMenuHandler();
    enqueueSnackbar("Signout Successful", { variant: "success" });
    setAuthAction(null);
  };

  return (
    <>
      <Avatar alt="Auth User" src="/images/profile.png" sx={{ mx: "auto", height: "70px", width: "70px" }} />

      <Typography variant="body1" mt={2} mb={4} sx={{ fontWeight: "bold", textAlignLast: "center" }}>
        {`You're logged in as ${auth.name}`}
      </Typography>

      <Button startIcon={<ExitToAppOutlined />} variant="contained" sx={{ textTransform: "cfetchertalize" }} onClick={logoutHandler}>
        Logout
      </Button>
    </>
  );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
  }),
  mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
