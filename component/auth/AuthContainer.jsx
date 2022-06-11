import { connect } from "react-redux";
import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { Authenticated, NotAuthenticated } from ".";
import { setSessionAction, setUserDataAction } from "@store/actions";
import { fetcher } from "@utils/clientFuncs";

const AuthContainer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null),
    open = Boolean(anchorEl),
    [auth, setAuth] = useState(null),
    { setSessionAction, setUserDataAction } = props;

  const displayProfileMenuHandler = (event) => setAnchorEl(event.currentTarget);

  const hideProfileMenuHandler = () => setAnchorEl(null);

  const getUserDetails = async () => {
    const clientToken = localStorage.getItem("AtlasSearchTranslation");

    // get user details
    await fetcher("/auth/verifyToken", { clientToken })
      .then((token) => {
        if (error && !token.session) return;
        const { userData, session, error } = token;

        setSessionAction(session);
        setUserDataAction(userData);
      })
      .catch(() => {
        throw "error occured";
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (props.token) localStorage.setItem("AtlasSearchTranslation", props.token);
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
  mapDispatchToProps = { setSessionAction, setUserDataAction };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
