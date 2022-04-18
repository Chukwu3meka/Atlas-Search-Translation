import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TextTranslator = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
          <Tab
            label={
              <Typography fontWeight={600} color="text.secondary">
                Detect Language
              </Typography>
            }
            // {...a11yProps(0)}
          />
          <Tab
            label="Item Two"
            // {...a11yProps(1)}
          />
          <Tab
            label="Item Three"
            // {...a11yProps(2)}
          />
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
  );
};

export default TextTranslator;
