import Router from "next/router";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { ExitToAppOutlined } from "@mui/icons-material";

import { setSessionAction } from "@store/actions";

const Authenticated = ({ setSessionAction, userData: { name } }) => {
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (logout) logoutHandler();
  }, [logout]);

  const logoutHandler = () => {
    setLoading(true);
    localStorage.removeItem("AtlasSearchTranslation");
    setSessionAction(null);
    setLogout(false);
    setLoading(false);
    Router.reload(window.location.pathname);
  };

  return (
    <>
      <Avatar alt="Auth User" src="/images/profile.png" sx={{ mx: "auto", height: "70px", width: "70px" }} />

      <Typography variant="body1" mt={2} mb={4} sx={{ fontWeight: "bold", textAlignLast: "center" }}>
        {`You're logged in as ${name}`}
      </Typography>

      <LoadingButton
        loading={loading}
        startIcon={<ExitToAppOutlined />}
        variant="contained"
        sx={{ textTransform: "capitalize" }}
        onClick={() => setLogout(true)}>
        Logout
      </LoadingButton>
    </>
  );
};

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
  }),
  mapDispatchToProps = { setSessionAction };

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
