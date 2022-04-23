import { connect } from "react-redux";

import { Layout } from ".";
import { useEffect, useState } from "react";

const LayoutContainer = (props) => {
  const { pageProps, Component } = props;
  const [sidebar, setSidebar] = useState(props.sidebar || null);

  // detect when sidebar state is updated
  useEffect(() => {
    setSidebar(props.sidebar);
  }, [props.sidebar]);

  return <Layout sidebar={sidebar} Component={Component} pageProps={pageProps} />;
};

const mapStateToProps = (state) => ({
    sidebar: state.layout.displaySidebar,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
