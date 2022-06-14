import { connect } from "react-redux";
import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { Authenticated, NotAuthenticated } from ".";
import { setUserDataAction } from "@store/actions";
import { fetcher } from "@utils/clientFuncs";

const AuthContainer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null),
    open = Boolean(anchorEl),
    { setUserDataAction } = props,
    [auth, setAuth] = useState({});

  const displayProfileMenuHandler = (event) => setAnchorEl(event.currentTarget);

  const hideProfileMenuHandler = () => setAnchorEl(null);

  const getUserDetails = async () => {
    // get user details
    await fetcher("/auth/verifyToken", {})
      .then(({ name, role }) => {
        setUserDataAction({ name, role });
        setAuth({ name, role });
      })
      .catch((e) => setAuth({}));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    setUserDataAction(props.auth);
    setAuth(props.auth);
  }, [props.auth.name]);

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
            {auth.name ? <Authenticated /> : <NotAuthenticated hideProfileMenuHandler={hideProfileMenuHandler} />}
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
  }),
  mapDispatchToProps = { setUserDataAction };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
