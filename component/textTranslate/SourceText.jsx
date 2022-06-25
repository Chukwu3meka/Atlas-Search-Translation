import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Tooltip from "@mui/material/Tooltip";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { speechToTextHandler, stopTextToSpeechHandler, textToSpeechHandler } from "@utils/clientFuncs";

const SourceText = ({ sourceText, clearTextHandler, handleSourceTextChange, sourceLanguage, speaking, setSpeaking }) => (
  <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
    <Box p={2} display="flex" alignItems="flex-start">
      <TextField
        name="source-text"
        multiline
        id="source"
        minRows={3}
        fullWidth
        value={sourceText}
        // size={122}
        variant="standard" // <== to enable us disable border
        onChange={(e) => handleSourceTextChange(e.target.value)}
        sx={{
          fontSize: 122,
          fontWeight: 500,
          color: "#474747",
        }}
        inputProps={{ style: { fontSize: 22 } }} // font size of input text
        InputProps={{
          style: { fontSize: 22 }, // font size of input label
          disableUnderline: true, // <== to hide underline in standard TextField variant
        }}
      />
      <Tooltip title="Clear source text" sx={{ ml: 1 }}>
        <IconButton aria-label="clear-source-text" onClick={clearTextHandler}>
          <CloseSharpIcon />
        </IconButton>
      </Tooltip>
    </Box>
    <Box display="flex" alignItems="center" pb={1}>
      <Tooltip title="Translate by voice">
        <IconButton
          aria-label="translate-by-voice"
          onClick={() => speechToTextHandler({ setText: handleSourceTextChange, language: sourceLanguage })}>
          <MicIcon />
        </IconButton>
      </Tooltip>
      {sourceText.length ? (
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
                onClick={() => textToSpeechHandler({ text: sourceText, language: sourceLanguage, setLoading: setSpeaking })}>
                <VolumeUpIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        ""
      )}
      <Box sx={{ flexGrow: 1 }} />
      <Typography color="text.secondary" fontSize={14} mr={1}>
        {`${sourceText.length}/5000`}
      </Typography>
      <Tooltip title="Turn on Virtual Keyboard">
        <IconButton aria-label="turn-on-virtual-keyboard">
          <KeyboardIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
);

export default SourceText;
