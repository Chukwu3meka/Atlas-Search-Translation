import Head from "next/head";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@source/theme";
import Layout from "@component/layout";
import { useStore } from "@store/index";
import { SnackbarProvider } from "notistack"; //for notifications
import createEmotionCache from "@source/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
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

      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={store}>
            <SnackbarProvider maxSnack={1} preventDuplicate>
              <Layout {...{ pageProps, Component }} />
            </SnackbarProvider>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
