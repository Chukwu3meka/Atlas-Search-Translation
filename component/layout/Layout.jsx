import Head from "next/head";
import { Provider } from "react-redux";
import { Box, Stack } from "@mui/material";

import theme from "@source/theme";
import Sidebar from "@component/sidebar";
import { HeaderContainer, styles, Footer } from ".";

const Layout = ({ pageProps, Component, store }) => (
  <>
    <Head>
      <title>OpenTranslation</title>
      <meta name="theme-color" content={theme.palette.primary.main} />
      <meta name="keywords" content="OpenTranslation, view" />
      <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="OpenTranslation" />
      <meta property="og:title" content="OpenTranslation" />
      <meta property="og:description" content="OpenTranslation" />
    </Head>
    <Provider store={store}>
      <Box className={styles.layout}>
        <HeaderContainer />
        <Stack direction="row">
          <Box
            // allow box take remaining space
            flexGrow={1}
            // hide main view on mobile device
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <Component {...pageProps} />
            <Footer />
          </Box>
          <Sidebar />
        </Stack>
      </Box>
    </Provider>
  </>
);

export default Layout;
