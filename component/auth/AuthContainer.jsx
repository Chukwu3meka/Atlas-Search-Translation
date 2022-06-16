import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Box, Menu, Paper, Avatar } from "@mui/material";

import { Authenticated, NotAuthenticated } from ".";
import { fetcher, setFetcherToken } from "@utils/clientFuncs";
import { setAuthAction, setPageReadyAction } from "@store/actions";

const AuthContainer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null),
    router = useRouter(),
    open = Boolean(anchorEl),
    [auth, setAuth] = useState(null),
    [ready, setReady] = useState(false),
    [cookies, setCookie] = useCookies(["token"]),
    { setAuthAction, setPageReadyAction } = props;

  useEffect(() => {
    setReady(true);
    getUserDetails();
  }, []);

  useEffect(() => {
    if (ready) {
      setAuthAction(props.auth);
      setAuth(props.auth);
    }
    return () => ready && setAuth(props.auth);
  }, [props.auth.name]);

  useEffect(() => {
    routeChangeComplete(window.location.pathname);
    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeError", routeChangeComplete);
    router.events.on("routeChangeComplete", routeChangeComplete);
    return () => {
      routeChangeComplete(window.location.pathname);
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeError", routeChangeComplete);
      router.events.off("routeChangeComplete", routeChangeComplete);
    };
  }, [router.events]);

  const routeChangeStart = (path) => {
    if (!ready) return;
    console.log("rout event s");
    const { role } = auth;
    if (path?.includes("admin") && role !== "admin") Router.push("/");
    setPageReadyAction(false);
  };

  const routeChangeComplete = (path) => {
    if (!ready) return;
    const { role } = auth;
    console.log("rout event c");

    console.log({ path, role });
    // if (path?.includes("admin") && role !== "admin") Router.push("/");
    setPageReadyAction(true);
  };

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
          setFetcherToken(token);
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
            {auth?.name ? (
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
  mapDispatchToProps = { setAuthAction, setPageReadyAction };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
