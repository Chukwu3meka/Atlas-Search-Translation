import { connect } from "react-redux";

import { Layout } from ".";
import { useEffect, useState } from "react";

const LayoutContainer = (props) => {
  const { pageProps, Component } = props,
    [pageReady, setPageReady] = useState(true),
    [sidebar, setSidebar] = useState(props.sidebar || null);

  // detect when sidebar state is updated
  useEffect(() => {
    setSidebar(props.sidebar);
  }, [props.sidebar]);

  // pageReady
  // detect when sidebar state is updated
  useEffect(() => {
    setPageReady(props.pageReady);
  }, [props.pageReady]);

  return <Layout sidebar={sidebar} pageReady={pageReady} Component={Component} pageProps={pageProps} />;
};

const mapStateToProps = (state) => ({
    sidebar: state.layout.displaySidebar,
    pageReady: state.layout.pageReady,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
