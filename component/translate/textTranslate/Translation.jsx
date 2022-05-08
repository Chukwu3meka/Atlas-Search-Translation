import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import ShareIcon from "@mui/icons-material/Share";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StarSharpIcon from "@mui/icons-material/StarSharp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StarBorderSharpIcon from "@mui/icons-material/StarBorderSharp";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";

import { textToSpeechHandler } from "@utils/clientFuncs";

const Translation = ({ translationText, translationSaved, copyTranslationHandler, saveTranslationHandler, translationLanguage }) => (
  <Box sx={{ width: "100%" }}>
    <Box p={2} alignItems="flex-start" display="flex" bgcolor="#eeeeee">
      <Input
        fullWidth
        multiline
        disableUnderline={true}
        minRows={3}
        fullWidth
        value={translationText}
        // to align text to the right
        inputProps={{ style: { textAlign: "right" } }}
        sx={{ fontSize: 22, fontWeight: 500, color: "#474747" }}
        disabled
        onChange={(e) => {
          console.log(e.target.value);
        }}
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
        <IconButton aria-label="listen" onClick={() => textToSpeechHandler({ text: translationText, language: translationLanguage })}>
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

export default Translation;
