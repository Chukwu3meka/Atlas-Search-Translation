import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { styles } from ".";

import { useState } from "react";

const Translate = ({ mainButtons }) => {
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
                  backgroundColor: translateType === label ? "#dee7fd" : null,
                }}>
                {label}
              </Button>
            ))}

            <Paper sx={{ mt: 2 }}></Paper>
            <Typography textAlign="right" fontSize={12}>
              <i>Send feedback</i>
            </Typography>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default Translate;
