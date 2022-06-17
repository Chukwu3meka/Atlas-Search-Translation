import { Box, Stack } from "@mui/material";

import Sidebar from "@component/sidebar";
import { HeaderContainer, styles, FooterContainer, PageLoading } from ".";

const Layout = ({ sidebar, Component, pageProps, pageReady, authReady }) => (
  <Box className={styles.layout}>
    <HeaderContainer />
    <Stack direction="row">
      <Box
        // allow box take remaining space
        flexGrow={1}
        // hide main view on mobile device when sidebar is active
        sx={sidebar ? { display: { xs: "none", sm: "none", md: "block" } } : null}>
        {authReady ? pageReady ? <Component {...pageProps} /> : <PageLoading /> : <PageLoading />}
        <FooterContainer />
      </Box>
      <Sidebar />
    </Stack>
  </Box>
);

export default Layout;
