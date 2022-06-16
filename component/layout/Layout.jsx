import { Box, Stack } from "@mui/material";

import Sidebar from "@component/sidebar";
import { HeaderContainer, styles, FooterContainer } from ".";

const Layout = ({ sidebar, Component, pageProps, pageReady }) => (
  <Box className={styles.layout}>
    <HeaderContainer />
    <Stack direction="row">
      <Box
        // allow box take remaining space
        flexGrow={1}
        // hide main view on mobile device when sidebar is active
        sx={sidebar ? { display: { xs: "none", sm: "none", md: "block" } } : null}>
        {pageReady ? <Component {...pageProps} /> : "loading page"}
        <FooterContainer />
      </Box>
      <Sidebar />
    </Stack>
  </Box>
);

export default Layout;
