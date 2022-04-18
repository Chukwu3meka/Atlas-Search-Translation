import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const TextTranslator = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const languageOptions = ["Detect Language", "English", "French", "Spanish"];

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
