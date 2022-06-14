import Router from "next/router";
import { useState } from "react";
import { connect } from "react-redux";

import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { ExitToAppOutlined } from "@mui/icons-material";

import { setUserDataAction } from "@store/actions";
import { fetcher } from "@utils/clientFuncs";

const Authenticated = (props) => {
  const { setUserDataAction } = props;
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(false);

  useState(() => {
    setAuth({ ...props.auth });
  }, [props.auth]);

  const logoutHandler = async () => {
    setLoading(true);
    await fetcher("/auth/signout", {}).catch((e) => {});
    setUserDataAction({});
    setLoading(false);
    Router.reload(window.location.pathname);
  };

  return (
    <>
      <Avatar alt="Auth User" src="/images/profile.png" sx={{ mx: "auto", height: "70px", width: "70px" }} />

      <Typography variant="body1" mt={2} mb={4} sx={{ fontWeight: "bold", textAlignLast: "center" }}>
        {`You're logged in as ${auth.name}`}
      </Typography>

      <LoadingButton
        loading={loading}
        startIcon={<ExitToAppOutlined />}
        variant="contained"
        sx={{ textTransform: "capitalize" }}
        onClick={logoutHandler}>
        Logout
      </LoadingButton>
    </>
  );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
  }),
  mapDispatchToProps = { setUserDataAction };

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
