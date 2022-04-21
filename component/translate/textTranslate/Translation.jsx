import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ShareIcon from "@mui/icons-material/Share";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StarSharpIcon from "@mui/icons-material/StarSharp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
import StarBorderSharpIcon from "@mui/icons-material/StarBorderSharp";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";

const languageOptions = ["English", "French", "Spanish"];

const TextTranslator = ({
  translationText,
  translationSaved,
  swapLanguageHandler,
  translationLanguage,
  handleLanguageChange,
  copyTranslationHandler,
  saveTranslationHandler,
}) => (
  <Box sx={{ width: "100%" }}>
    {/* language tab and swap icon */}
    <Box display="flex" alignItems="center" sx={{ borderBottom: 1, borderColor: "divider" }}>
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

    {/* input and saveicon container */}
    <Box p={2} alignItems="flex-start" display="flex" bgcolor="#eeeeee">
      <Input
        fullWidth
        multiline
        disableUnderline={true}
        minRows={4}
        fullWidth
        value={translationText}
        // to align text to the right
        inputProps={{ style: { textAlign: "right" } }}
        sx={{ fontSize: 22, fontWeight: 500, color: "#474747" }}
        // onChange={handleFromTextChange}
      />
      <Tooltip title="Save Translation" sx={{ ml: 1 }} onClick={saveTranslationHandler}>
        <IconButton aria-label="save-translation">
          {translationSaved ? <StarSharpIcon color="secondary" /> : <StarBorderSharpIcon />}
        </IconButton>
      </Tooltip>
    </Box>

    {/* translation footer */}
    <Box display="flex" alignItems="center" bgcolor="#eeeeee" pb={1}>
      <Tooltip title="Listen">
        <IconButton aria-label="listen">
          <VolumeUpIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ flexGrow: 1 }} />
      <Tooltip title="Copy Translation">
        <IconButton aria-label="copy-translation" onClick={copyTranslationHandler}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Rate this translation">
        <IconButton aria-label="rate-this-translation">
          <ThumbsUpDownOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share translation">
        <IconButton aria-label="share-translation">
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
);

export default TextTranslator;
