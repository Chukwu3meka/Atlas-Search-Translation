import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AuthContainer from "@component/auth/AuthContainer";
import Link from "next/link";

const Header = ({ navBar, toggleDrawer }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ padding: 0 }} color="transparent">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }} color="text.secondary"> */}
          <Box flexGrow={1}>
            <Link href="/">
              <a>
                <Typography fontSize={20} component="h1" color="text.secondary">
                  Atlas Search Translation
                </Typography>
              </a>
            </Link>
          </Box>
          <AuthContainer />
        </Toolbar>
      </AppBar>

      {navBar()}
    </Box>
  );
};

export default Header;
