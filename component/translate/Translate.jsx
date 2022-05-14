import { Box, Button, Paper, Typography } from "@mui/material";

import LanguageContainer from "@component/language";
import TextTranslate from "@component/textTranslate";
import { DocumentsTranslate, styles, WebsitesTranslate } from ".";

const Translate = ({ translateOptions, translateType, translateTypeHandler }) => (
  <Box className={styles.translate}>
    <div />
    <Box>
      {translateOptions.map(({ label, icon }) => (
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
            // hide "Documents option" when on mobile device
            display: label === "Documents" ? { xs: "none", sm: "none", md: "inline-block" } : "",
          }}>
          {label}
        </Button>
      ))}

      <Paper
        elevation={2}
        className={styles.translateContainer}
        sx={{
          p: 0,
          mt: 2,
          mb: 0.5,
          // border: "3px solid red",
          // minHeight: translateType === "Documents" ? 300 : translateType === "Websites" ? 260 : 270,
        }}>
        <LanguageContainer />
        {translateType === "Text" ? <TextTranslate /> : translateType === "Documents" ? <DocumentsTranslate /> : <WebsitesTranslate />}
      </Paper>
      <Typography textAlign="right" fontSize={12}>
        <i>Send feedback</i>
      </Typography>
    </Box>
  </Box>
);

export default Translate;
