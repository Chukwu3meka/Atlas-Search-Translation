import { connect } from "react-redux";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import HistoryIcon from "@mui/icons-material/History";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import { Footer } from ".";
import { displaySidebarAction } from "@store/actions";

const bottomButtons = [
  { label: "Saved", icon: <StarIcon fontSize="large" /> },
  { label: "History", icon: <HistoryIcon fontSize="large" /> },
  { label: "Contribuute", icon: <PeopleAltOutlinedIcon fontSize="large" /> },
];

const FooterContainer = (props) => {
  const { displaySidebarAction } = props;
  const [sidebar, setSidebar] = useState(props.sidebar || null);

  // detect when sidebar state is updated
  useEffect(() => {
    setSidebar(props.sidebar);
  }, [props.sidebar]);

  const displaySidebarHandler = (component) => () => {
    displaySidebarAction(component === sidebar ? null : component);
  };

  return <Footer bottomButtons={bottomButtons} displaySidebarHandler={displaySidebarHandler} />;
};

const mapStateToProps = (state) => ({
    sidebar: state.layout.displaySidebar,
  }),
  mapDispatchToProps = { displaySidebarAction };

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
