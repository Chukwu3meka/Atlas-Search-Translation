import Head from "next/head";
import { connect } from "react-redux";
import { Box, Stack } from "@mui/material";

import Sidebar from "@component/sidebar";
import { HeaderContainer, styles, Footer } from ".";
import { useEffect, useState } from "react";

const Layout = (props) => {
  const { pageProps, Component } = props;
  const [sidebar, setSidebar] = useState(props.sidebar || null);

  // detect when sidebar state is updated
  useEffect(() => {
    setSidebar(props.sidebar);
  }, [props.sidebar]);

  // sidebar;
  return (
    <Box className={styles.layout}>
      <HeaderContainer />
      <Stack direction="row">
        <Box
          // allow box take remaining space
          flexGrow={1}
          // hide main view on mobile device when sidebar is active
          sx={sidebar ? { display: { xs: "none", sm: "none", md: "block" } } : null}>
          <Component {...pageProps} />
          <Footer />
        </Box>
        <Sidebar />
      </Stack>
    </Box>
  );
};

const mapStateToProps = (state) => ({
    sidebar: state.layout.displaySidebar,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
