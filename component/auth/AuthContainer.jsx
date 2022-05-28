import { connect } from "react-redux";
import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { AuthenticatedContainer, NotAuthenticatedContainer } from ".";

const AuthContainer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null),
    open = Boolean(anchorEl),
    [userId, setUserId] = useState(null);

  const displayProfileMenuHandler = (event) => setAnchorEl(event.currentTarget);

  const hideProfileMenuHandler = () => setAnchorEl(null);

  useEffect(() => {
    setUserId(props.userId);
    return () => {
      setUserId(props.userId);
    };
  }, [props.userId]);

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
            {userId ? <AuthenticatedContainer /> : <NotAuthenticatedContainer hideProfileMenuHandler={hideProfileMenuHandler} />}
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
    userId: state.auth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
