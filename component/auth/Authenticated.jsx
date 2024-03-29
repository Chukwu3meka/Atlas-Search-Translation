import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { ExitToAppOutlined } from "@mui/icons-material";
import { Avatar, Typography, Button } from "@mui/material";

import { setAuthAction } from "@store/actions";
import { fetcher } from "@utils/clientFuncs";

const Authenticated = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    { auth, setAuthAction, hideProfileMenuHandler } = props;

  const logoutHandler = async () => {
    await fetcher("/auth/signout");
    setAuthAction(null);
    hideProfileMenuHandler();
    enqueueSnackbar("Signout Successful", { variant: "success" });
    Router.push("/");
  };

  return (
    <>
      <Avatar alt="Auth User" src="/images/profile.png" sx={{ mx: "auto", height: "70px", width: "70px" }} />
      <Typography variant="body1" mt={2} mb={4} sx={{ fontWeight: "bold", textAlignLast: "center" }}>
        {`You're logged in as ${auth.name}`}
      </Typography>
      <Button startIcon={<ExitToAppOutlined />} variant="contained" sx={{ textTransform: "capitalize" }} onClick={logoutHandler}>
        Logout
      </Button>

      <Typography variant="body1" sx={{ textAlignLast: "center", mt: 2, textTransform: "capitalize" }}>
        {auth.role !== "user" && `${auth.role} Privledge`}
      </Typography>

      <hr width="50%" style={{ marginRight: 0 }} />

      <Link href="/">
        <Typography variant="body1" fontSize={13} mt={1} sx={{ textAlignLast: "center" }}>
          Privacy Policy • Terms of Service
        </Typography>
      </Link>
    </>
  );
};

const mapStateToProps = (state) => ({}),
  mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
