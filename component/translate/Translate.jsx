import { DocumentsTranslate, styles, TextTranslate, WebsitesTranslate } from ".";
import { Box, Button, Paper, Typography } from "@mui/material";

const Translate = ({ mainButtons, translateType, translateTypeHandler }) => (
  <Box className={styles.translate}>
    <div />
    <Box>
      <div>
        <Box>
          {mainButtons.map(({ label, icon }) => (
            <Button
              key={label}
              startIcon={icon}
              variant="outlined"
              onClick={translateTypeHandler(label)}
              sx={{
                mr: 1,
                fontWeight: "bold",
                textTransform: "capitalize",
                backgroundColor: translateType === label ? "#dee7fd" : null,
              }}>
              {label}
            </Button>
          ))}

          <Paper elevation={4} sx={{ mt: 2, mb: 0.5, minHeight: translateType === "Documents" ? 300 : 220 }}>
            {translateType === "Text" ? (
              <TextTranslate />
            ) : translateType === "Documents" ? (
              <DocumentsTranslate />
            ) : (
              <WebsitesTranslate />
            )}
          </Paper>
          <Typography textAlign="right" fontSize={12}>
            <i>Send feedback</i>
          </Typography>
        </Box>
      </div>
    </Box>
  </Box>
);

export default Translate;
