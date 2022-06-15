import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { fetcher, setfetcherToken } from "@utils/clientFuncs";
import { setAuthAction } from "@store/actions";
import { Authenticated, NotAuthenticated } from ".";

const AuthContainer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null),
    open = Boolean(anchorEl),
    { setAuthAction } = props,
    [auth, setAuth] = useState({}),
    [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    setAuthAction(props.auth);
    setAuth(props.auth);
    return () => setAuth({}); // <= cleanup function
  }, [props.auth.name]);

  const displayProfileMenuHandler = (event) => setAnchorEl(event.currentTarget);

  const hideProfileMenuHandler = () => setAnchorEl(null);

  const getUserDetails = async () => {
    const token = cookies.token;
    if (token) {
      await fetcher("/auth/verifyToken", {
        token,
      })
        .then(({ name, role }) => {
          setAuthAction({ name, role });
          setAuth({ name, role });
          setfetcherToken(token);
        })
        .catch((e) => setAuth({}));
    }
  };

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
            {auth.name ? (
              <Authenticated hideProfileMenuHandler={hideProfileMenuHandler} auth={auth} />
            ) : (
              <NotAuthenticated hideProfileMenuHandler={hideProfileMenuHandler} />
            )}
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    name: state.auth.name,
  }),
  mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
