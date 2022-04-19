import * as React from "react";
import PropTypes from "prop-types";
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

const TextTranslator = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const languageOptions = ["English", "French", "Spanish"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
                {languageOptions.map((label) => (
                  <Tab
                    value={label}
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
                sx={{ fontSize: 22, fontWeight: 500, color: "#474747" }}
                fullWidth
                // value={x}
                InputProps={
                  {
                    // disableUnderline: true,
                    //
                  }
                }
                onChange={(e) => {
                  // const tempContent = [...formatContentArray()];
                  // tempContent[index] = e.target.value;
                  // setContentArray([...tempContent]);
                }}
              />
            </Box>
            <Box alignItems="center" display="flex">
              <IconButton aria-label="microphone">
                <MicIcon />
              </IconButton>
              <IconButton aria-label="listen">
                <VolumeUpIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Typography color="text.secondary" fontSize={14}>
                /5000
              </Typography>

              <IconButton aria-label="keyboard">
                <KeyboardIcon fontSize="small" />
              </IconButton>
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
