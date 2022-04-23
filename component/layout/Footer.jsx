import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";

import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Link from "next/link";
import { History } from ".";

const bottomButtons = [
  { label: "Saved", icon: <StarIcon fontSize="large" /> },
  { label: "History", icon: <HistoryIcon fontSize="large" /> },
  { label: "Contribuute", icon: <PeopleAltOutlinedIcon fontSize="large" /> },
];

const Footer = () => (
  <>
    <Box
      margin="auto"
      sx={{
        width: "fit-content",
        display: "flex",
        flexDirection: "row",
        gap: 7,
        margin: "auto",
        marginTop: 7,
      }}>
      {bottomButtons.map(({ label, icon }) => (
        // <Link href={`/${label.toLowerCase()}`} key={label}>
        <a key={label}>
          <Stack direction="column" spacing={1} key={label} justifyContent="center" alignItems="center">
            <IconButton aria-label={label} sx={{ border: "1px solid #dad7d7", padding: 2.2 }}>
              {icon}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Stack>
        </a>
        // </Link>
      ))}
    </Box>

    {/* <Box
      // className=""
      // component="img"
      sx={{
        position: "fixed",
        top: 65,
        right: 0,
        border: "3px solid red",
        height: 233,
        width: "100%",
        height: "calc(100vh - 65px)",
        maxWidth: { xs: "initial", sm: "initial", md: 400, lg: 480 },
      }}>
      <History />
    </Box> */}
  </>
);
export default Footer;
