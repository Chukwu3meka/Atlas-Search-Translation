import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

const Header = ({ navBar, toggleDrawer }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ padding: 0 }} color="transparent">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OpenTranslation
          </Typography>
          <Avatar alt="Remy Sharp" src="/images/profile.png" />
        </Toolbar>
      </AppBar>

      {navBar()}
    </Box>
  );
};

export default Header;
