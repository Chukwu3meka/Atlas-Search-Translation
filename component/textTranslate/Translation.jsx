import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import StopIcon from "@mui/icons-material/Stop";
import ShareIcon from "@mui/icons-material/Share";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StarSharpIcon from "@mui/icons-material/StarSharp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StarBorderSharpIcon from "@mui/icons-material/StarBorderSharp";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";

import { stopTextToSpeechHandler, textToSpeechHandler } from "@utils/clientFuncs";
import FeedbackContainer from "@component/feedback/FeedbackContainer";
// import { TextField } from "@mui/material";

const Translation = ({
  speaking,
  setSpeaking,
  translationText,
  translationSaved,
  translationLanguage,
  copyTranslationHandler,
  saveTranslationHandler,
}) => (
  <Box sx={{ width: "100%" }}>
    <Box p={2} alignItems="flex-start" display="flex" bgcolor="#eeeeee">
      <TextField
        fullWidth
        multiline
        fullWidth
        minRows={3}
        value={translationText}
        lang={translationLanguage}
        variant="standard" // <== to enable us disable border
        sx={{ fontSize: 22, fontWeight: 500, color: "#474747" }}
        inputProps={{ style: { textAlign: "right" } }} // to align text to the right
        onKeyDown={(event) => event.preventDefault()} // <== disable typing in react input
        inputProps={{ style: { fontSize: 22 } }} // font size of input text
        InputProps={{
          style: { fontSize: 22 }, // font size of input label
          disableUnderline: true, // <== to hide underline in standard TextField variant
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
      {translationText?.length && !translationText?.endsWith("...") ? (
        <>
          {speaking ? (
            <Tooltip title="Stop Listening">
              <IconButton aria-label="stop-listening" onClick={stopTextToSpeechHandler}>
                <StopIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Listen">
              <IconButton
                aria-label="listen"
                onClick={() => textToSpeechHandler({ text: translationText, language: translationLanguage, setLoading: setSpeaking })}>
                <VolumeUpIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        ""
      )}
      <Box sx={{ flexGrow: 1 }} />
      <Tooltip title="Copy Translation">
        <IconButton aria-label="copy-translation" onClick={copyTranslationHandler}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <FeedbackContainer />
      <Tooltip title="Share translation">
        <IconButton aria-label="share-translation">
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
);

export default Translation;
