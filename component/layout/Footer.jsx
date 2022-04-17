import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";

import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Link from "next/link";

const bottomButtons = [
  { label: "History", icon: <HistoryIcon fontSize="large" /> },
  { label: "Saved", icon: <StarIcon fontSize="large" /> },
  { label: "Contribuute", icon: <PeopleAltOutlinedIcon fontSize="large" /> },
];

const Footer = () => (
  <Box
    margin="auto"
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      maxWidth: 500,
      marginTop: 10,
    }}>
    {bottomButtons.map(({ label, icon }) => (
      <Link href={`/${label.toLowerCase()}`}>
        <a>
          <Stack direction="column" spacing={1} key={label} justifyContent="center" alignItems="center">
            <IconButton aria-label={label} sx={{ border: "1px solid #dad7d7", padding: 2 }}>
              {icon}
            </IconButton>
            <Typography variant="body2" color="grey">
              {label}
            </Typography>
          </Stack>
        </a>
      </Link>
    ))}
  </Box>
);
export default Footer;
