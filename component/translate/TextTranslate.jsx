import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";

import MicIcon from "@mui/icons-material/Mic";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

const languageOptions = ["English", "French", "Spanish"];

const TextTranslator = () => {
  const [fromLanguageTab, setFromLanguageTab] = useState("English");

  const [fromText, setFromText] = useState("");

  const handleFromLanguageTabChange = (event, newValue) => {
    setFromLanguageTab(newValue);
  };

  const handleFromTextChange = ({ target: { value } }) => setFromText(value);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={fromLanguageTab}
                onChange={handleFromLanguageTabChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons="auto">
                {languageOptions.map((label) => (
                  <Tab
                    value={label}
                    key={label}
                    label={
                      <Typography fontWeight={600} color="text.secondary">
                        {label}
                      </Typography>
                    }
                  />
                ))}
              </Tabs>
            </Box>
            <Box p={2}>
              <Input
                fullWidth
                multiline
                disableUnderline={true}
                minRows={4}
                fullWidth
                value={fromText}
                sx={{ fontSize: 22, fontWeight: 500, color: "#474747" }}
                onChange={handleFromTextChange}
              />
            </Box>
            <Box alignItems="center" display="flex" pb={1}>
              <Tooltip title="Add" arrow>
                <IconButton aria-label="microphone">
                  <MicIcon />
                </IconButton>
              </Tooltip>
              {fromText.length ? (
                <Tooltip title="Add" arrow>
                  <IconButton aria-label="listen">
                    <VolumeUpIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Typography color="text.secondary" fontSize={14} mr={1}>
                {`${fromText.length}/5000`}
              </Typography>
              <Tooltip title="Add" arrow>
                <IconButton aria-label="keyboard">
                  <KeyboardIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel> */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Box>
  );
};

export default TextTranslator;
