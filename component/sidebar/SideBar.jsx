import Head from "next/head";
import { Box, Paper, Stack } from "@mui/material";

const SideBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 65px)", md: "calc(100vh - 65px)", xs: "calc(100vh - 65px)" },
        maxWidth: { xs: "initial", sm: "initial", md: 400, lg: 480 },
      }}>
      <Paper elevation={4} sx={{ borderRadius: "0", height: "100%" }}>
        sds{/* <SideBar /> */}
      </Paper>
    </Box>
  );
};

export default SideBar;
