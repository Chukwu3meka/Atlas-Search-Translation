import { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";

import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Link from "next/link";
import { History } from ".";
import { displaySidebarAction } from "@store/actions";

const bottomButtons = [
  { label: "Saved", icon: <StarIcon fontSize="large" /> },
  { label: "History", icon: <HistoryIcon fontSize="large" /> },
  { label: "Contribuute", icon: <PeopleAltOutlinedIcon fontSize="large" /> },
];

const Footer = ({ displaySidebarAction }) => {
  const displaySidebarHandler = (component) => () => {
    displaySidebarAction(component);
  };

  return (
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
        <a key={label} onClick={displaySidebarHandler(label)}>
          <Stack direction="column" spacing={1} key={label} justifyContent="center" alignItems="center">
            <IconButton aria-label={label} sx={{ border: "1px solid #dad7d7", padding: 2.2 }}>
              {icon}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Stack>
        </a>
      ))}
    </Box>
  );
};

const mapStateToProps = (state) => ({}),
  mapDispatchToProps = { displaySidebarAction };

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
