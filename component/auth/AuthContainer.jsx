import Link from "next/link";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Menu, Paper, Avatar, Stack, Typography, Button } from "@mui/material";

import { Authenticated } from ".";
import { fetcher, sleep } from "@utils/clientFuncs";
import { setAuthAction, setPageReadyAction } from "@store/actions";

const AuthContainer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null),
    router = useRouter(),
    open = Boolean(anchorEl),
    [auth, setAuth] = useState({}),
    { setAuthAction, setPageReadyAction } = props;

  useEffect(() => {
    async function verifyToken() {
      await fetcher("/auth/verifyToken")
        .then(({ name, role }) => {
          if (name && role) return setAuthAction({ name, role, status: true });
          setAuthAction({ status: false }); // <= set empty object else unauthenticated user can't access the page
        })
        .catch((e) => {
          setAuthAction({ status: false }); // <= set empty object else unauthenticated user can't access the page
        });

      routeChangeComplete(window.location.pathname, props.auth); // <= initial page load
    }
    verifyToken();
  }, []);

  useEffect(() => {
    setAuth(props.auth);
    setAuthAction(props.auth);
  }, [props.auth?.status]);

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

  const disablePageReady = () => setPageReadyAction(false);

  const routeChangeComplete = async () => {
    await sleep(0.1);
    setPageReadyAction(true);
  };

  const displayProfileMenuHandler = (event) => setAnchorEl(event.currentTarget);

  const hideProfileMenuHandler = () => setAnchorEl(null);

  // const getUserDetails = async () => {
  //   await fetcher("/auth/verifyToken")
  //     .then(({ name, role }) => setAuthAction({ name, role, status: true }))
  //     .catch((e) => {
  //       setAuth({});
  //       setAuthAction({ status: false }); // <= set empty object else unauthenticated user can't access the page
  //     });

  //   routeChangeComplete(window.location.pathname, props.auth); // <= initial page load
  // };

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
              <Stack spacing={2} sx={{ textAlign: "center" }}>
                <Link href="/auth/signup">
                  <Button onClick={hideProfileMenuHandler}>Create account</Button>
                </Link>
                <Link href="/auth/signin">
                  <Button onClick={hideProfileMenuHandler}>Signin to Account</Button>
                </Link>

                {/* <Link href="/auth/reset">
                  <Button onClick={hideProfileMenuHandler}>Reset/Forgot your password?</Button>
                </Link> */}
              </Stack>
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
