import { connect } from "react-redux";
import { Box, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { Contribute, History, Saved } from ".";
import { displaySidebarAction } from "@store/actions";

const Sidebar = (props) => {
  const { displaySidebarAction } = props;
  const [sidebar, setSidebar] = useState(props.sidebar || null);

  // detect when sidebar state is updated
  useEffect(() => {
    setSidebar(props.sidebar);
  }, [props.sidebar]);

  const hideSidebarHandler = () => displaySidebarAction(null);

  return sidebar ? (
    <Box
      sx={{
        width: "100%",
        height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 65px)", md: "calc(100vh - 65px)", xs: "calc(100vh - 65px)" },
        maxWidth: { xs: "initial", sm: "initial", md: 400, lg: 480 },
      }}>
      <Paper elevation={4} sx={{ borderRadius: "0", height: "100%", padding: 0 }}>
        {sidebar === "History" ? (
          <History hideSidebarHandler={hideSidebarHandler} />
        ) : sidebar === "Saved" ? (
          <Saved hideSidebarHandler={hideSidebarHandler} />
        ) : (
          <Contribute hideSidebarHandler={hideSidebarHandler} />
        )}
      </Paper>
    </Box>
  ) : null;
};

const mapStateToProps = (state) => ({
    sidebar: state.layout.displaySidebar,
  }),
  mapDispatchToProps = { displaySidebarAction };

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
