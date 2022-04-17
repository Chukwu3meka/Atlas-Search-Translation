import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { styles } from ".";

import TranslateIcon from "@mui/icons-material/Translate";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import LanguageIcon from "@mui/icons-material/Language";

import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Fragment, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const mainButtons = [
  { label: "Text", icon: <TranslateIcon /> },
  { label: "Documents", icon: <PlagiarismIcon /> },
  { label: "Websites", icon: <LanguageIcon /> },
];

const bottomButtons = [
  { label: "History", icon: <HistoryIcon fontSize="large" /> },
  { label: "Saved", icon: <StarIcon fontSize="large" /> },
  { label: "Contribuute", icon: <PeopleAltOutlinedIcon fontSize="large" /> },
];

const Translate = () => {
  const [translateType, setTranslateType] = useState("Text");
  return (
    <Box className={styles.translate}>
      <div />
      <Box>
        <div>
          <Box>
            {mainButtons.map(({ label, icon }) => (
              <Button
                key={label}
                variant="outlined"
                startIcon={icon}
                sx={{
                  mr: 1,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  backgroundColor: translateType === label ? "#e2eafc" : null,
                }}>
                {label}
              </Button>
            ))}

            <Paper sx={{ mt: 2 }}>Translate</Paper>
            <Typography textAlign="right" fontSize={12}>
              <i>Send feedback</i>
            </Typography>
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
                <Stack direction="column" spacing={1} key={label} justifyContent="center" alignItems="center">
                  <IconButton aria-label={label} sx={{ border: "1px solid #dad7d7", padding: 2 }}>
                    {icon}
                  </IconButton>
                  <Typography variant="body2">{label}</Typography>
                </Stack>
              ))}
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default Translate;
