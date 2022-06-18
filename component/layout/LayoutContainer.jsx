import { connect } from "react-redux";

import { Layout } from ".";
import { useEffect, useState } from "react";

const LayoutContainer = (props) => {
  const { pageProps, Component } = props,
    [pageReady, setPageReady] = useState(true),
    [authReady, setAuthReady] = useState(false),
    [sidebar, setSidebar] = useState(props.sidebar || null);

  // detect when sidebar state is updated
  // this will prevent re-render in child components
  useEffect(() => setAuthReady(true), []);

  // detect when sidebar state is updated
  useEffect(() => setSidebar(props.sidebar), [props.sidebar]);

  // detect when sidebar state is updated
  useEffect(() => setPageReady(props.pageReady), [props.pageReady]);

  return <Layout authReady={authReady} sidebar={sidebar} pageReady={pageReady} Component={Component} pageProps={pageProps} />;
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    sidebar: state.layout.displaySidebar,
    pageReady: state.layout.pageReady,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
