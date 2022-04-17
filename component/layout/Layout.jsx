import Head from "next/head";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { useEffect } from "react";

import theme from "@source/theme";
import { Header, styles } from ".";
import { setDeviceWidthAction } from "@store/actions";
import { Box } from "@mui/material";

const Layout = ({ pageProps, Component, store, setDeviceWidthAction }) => {
  useEffect(() => {
    setDeviceWidthAction(window.innerWidth);
  }, []);

  return (
    <>
      <Head>
        <title>OpenTranslation</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        {/* <meta property="og:url" content="https://www.opentranslation.com/" /> */}
        <meta name="keywords" content="OpenTranslation, view" />
        <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="OpenTranslation" />
        <meta property="og:title" content="OpenTranslation" />
        <meta property="og:description" content="OpenTranslation" />
      </Head>
      <Provider store={store}>
        <Box className={styles.layout}>
          <Header />
          <Box>
            <Component {...pageProps} />
          </Box>
        </Box>
      </Provider>
    </>
  );
};

const mapStateToProps = (state) => ({
    error: state.error,
  }),
  mapDispatchToProps = {
    setDeviceWidthAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
