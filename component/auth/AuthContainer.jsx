import { connect } from "react-redux";
import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { Authenticated, NotAuthenticated } from ".";
import { setSessionAction } from "@store/actions";

const AuthContainer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null),
    open = Boolean(anchorEl),
    { setSessionAction } = props,
    [auth, setAuth] = useState(null);

  const displayProfileMenuHandler = (event) => setAnchorEl(event.currentTarget);

  const hideProfileMenuHandler = () => setAnchorEl(null);

  useEffect(() => {
    // verifyToken
    const clientToken = localStorage.getItem("OpenTranslation");
    if (clientToken) {
      const base64Url = clientToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const { session } = JSON.parse(jsonPayload);

      // get user details

      setSessionAction(session);
    }
  }, []);

  useEffect(() => {
    if (props.token) localStorage.setItem("OpenTranslation", props.token);
  }, [props.token]);

  useEffect(() => {
    setAuth(props.session);
  }, [props.session]);

  return (
    <>
      <Avatar alt="Auth User" src="/images/profile.png" onClick={displayProfileMenuHandler} />

      <Menu
        open={open}
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={hideProfileMenuHandler}
        MenuListProps={{ "aria-labelledby": "basic-button" }}>
        <Paper elevation={0} sx={{ borderRadius: 20 }}>
          <Box display="flex" flexDirection="column" p={1.5} maxWidth={350}>
            {auth ? <Authenticated /> : <NotAuthenticated hideProfileMenuHandler={hideProfileMenuHandler} />}
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
    token: state.auth.token,
    session: state.auth.session,
  }),
  mapDispatchToProps = { setSessionAction };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
