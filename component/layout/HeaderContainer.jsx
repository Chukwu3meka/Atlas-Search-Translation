import Link from "next/link";
import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";

import { Header } from ".";

const navBarLinks = [
  { label: "Privacy & Terms", path: "/Privacy&Terms" },
  { label: "Help", path: "/help" },
  { label: "Send feedback", path: "/sendFeedback" },
  { label: "About AtlasSearchTranslation", path: "/aboutAtlasSearchTranslation" },
];

const HeaderContainer = () => {
  const [displayNavBar, setDisplayNavBar] = useState(false);

  const toggleDrawer = (status) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDisplayNavBar(status);
  };

  const navBar = () => (
    //
    // f
    // https://github.com/mui/material-ui/issues/10587
    // If you inject the contents of the Drawer using a function like in the demo, it slides.

    <Drawer
      // disableEnforceFocus
      anchor="left"
      open={displayNavBar}
      onOpen={toggleDrawer(true)}
      onClose={toggleDrawer(false)}>
      <Box sx={{ width: 270 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        <Typography variant="h6" component="h1" p={2}>
          AtlasSearchTranslation
        </Typography>
        <Link href="/about">
          <a>
            <Typography variant="body2" mt={1} mb={3} pl={5}>
              About AtlasSearchTranslation
            </Typography>
          </a>
        </Link>

        <Divider />
        <List>
          {navBarLinks.map(({ label, path }) => (
            <ListItem button key={path}>
              <ListItemText
                primary={
                  <Link href={path}>
                    <Typography pl={3} variant="body2">
                      {label}
                    </Typography>
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return <Header navBar={navBar} toggleDrawer={toggleDrawer} />;
};

export default HeaderContainer;
