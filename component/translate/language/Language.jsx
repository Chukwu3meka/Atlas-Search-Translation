import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Tooltip from "@mui/material/Tooltip";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
import languages from "@source/languages";

const Language = ({
  mobileDevice,
  sourceLanguage,
  swapLanguageHandler,
  translationLanguage,
  handleLanguageChange,
  displayDialogHandler, //display fullscreen dialog for language change on mobile device,
}) =>
  mobileDevice ? (
    <Box
      sx={{
        padding: 0.5,
        borderBottom: 1,
        display: "flex",
        alignItems: "center",
        borderColor: "divider",
        justifyContent: "space-evenly",
      }}>
      <Typography
        color="primary"
        fontWeight={600}
        textTransform="uppercase"
        sx={{ cursor: "pointer" }}
        onClick={() => displayDialogHandler({ dialogTarget: "source" })}>
        {sourceLanguage}
      </Typography>
      <Tooltip title="Swap Languages (Ctrl_Shift+S)">
        <IconButton aria-label="swap-languages(ctrl_shift_s)" onClick={swapLanguageHandler}>
          <SwapHorizSharpIcon />
        </IconButton>
      </Tooltip>
      <Typography
        color="primary"
        fontWeight={600}
        textTransform="uppercase"
        sx={{ cursor: "pointer" }}
        onClick={() => displayDialogHandler({ dialogTarget: "translation" })}>
        {translationLanguage}
      </Typography>
    </Box>
  ) : (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Grid container>
        <Grid item xs={6}>
          <Box>
            <Tabs
              value={sourceLanguage}
              onChange={(_, value) => handleLanguageChange({ target: "source", value })}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto">
              {languages.map((label) => (
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
        </Grid>

        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <Tooltip title="Swap Languages (Ctrl_Shift+S)">
              {/* margin left to put swap at center of source&translation */}
              <IconButton aria-label="swap-languages(ctrl_shift_s)" sx={{ ml: -2.5 }} onClick={swapLanguageHandler}>
                <SwapHorizSharpIcon />
              </IconButton>
            </Tooltip>
            <Tabs
              value={translationLanguage}
              onChange={(_, value) => handleLanguageChange({ target: "translation", value })}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto">
              {languages.map((label) => (
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
        </Grid>
      </Grid>
    </Box>
  );

export default Language;
