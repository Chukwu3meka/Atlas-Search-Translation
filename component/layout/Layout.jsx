import Head from "next/head";
import { Box } from "@mui/material";
import { Provider } from "react-redux";

import theme from "@source/theme";
import { HeaderContainer, styles } from ".";

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
        <Component {...pageProps} />
      </Box>
    </Provider>
  </>
);

export default Layout;
