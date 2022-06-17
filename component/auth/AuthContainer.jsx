import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Box, Menu, Paper, Avatar } from "@mui/material";

import { Authenticated, NotAuthenticated } from ".";
import { fetcher, setFetcherToken, sleep } from "@utils/clientFuncs";
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
      setAuth(props.auth);
      setAuthAction(props.auth);
      routeChangeComplete(window.location.pathname, props.auth); // <= initial page load
    }
    return () => ready && setAuth(props.auth);
  }, [props.auth.status]);

  useEffect(() => {
    router.events.on("routeChangeStart", disablePageReady);
    router.events.on("routeChangeError", routeChangeComplete);
    router.events.on("routeChangeComplete", routeChangeComplete);
    return () => {
      router.events.off("routeChangeStart", disablePageReady);
      router.events.off("routeChangeError", routeChangeComplete);
      router.events.off("routeChangeComplete", routeChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        // Will run when leaving the current page; on back/forward actions
        // Add your logic here, like toggling the modal state
        // router events won't catch back/forward botton
        // console.log(window.location.pathname, as, router.asPath);
        routeChangeComplete(as);
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]); // Add any state variables to dependencies array if needed.

  const disablePageReady = () => setPageReadyAction(false);

  const routeChangeComplete = async (path, propsAuth) => {
    if (!ready) return;

    const { role } = propsAuth || auth || props.auth;

    await sleep(0.5);

    if (path?.includes("admin") && role !== "admin") return Router.push("/").then(() => setPageReadyAction(true));

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
          setAuthAction({ name, role, status: true });
          setFetcherToken(token);
        })
        .catch((e) => setAuth({}));
    } else {
      setAuthAction({ status: false }); // <= set empty object else unauthenticated user can't access the page
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
            {auth?.status ? (
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
    status: state.auth.status,
  }),
  mapDispatchToProps = { setAuthAction, setPageReadyAction };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
