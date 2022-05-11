import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import StopIcon from "@mui/icons-material/Stop";
import Alert from "@mui/material/Alert";
import ShareIcon from "@mui/icons-material/Share";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StarSharpIcon from "@mui/icons-material/StarSharp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StarBorderSharpIcon from "@mui/icons-material/StarBorderSharp";

import { stopTextToSpeechHandler, textToSpeechHandler } from "@utils/clientFuncs";
import { FeedbackContainer } from ".";
import Link from "next/link";
import { Button, ButtonGroup, Stack } from "@mui/material";

const Translation = ({
  speaking,
  setSpeaking,
  suggestAnEdit,
  translationText,
  suggestAnEditRef,
  translationSaved,
  translationLanguage,
  copyTranslationHandler,
  saveTranslationHandler,
  suggestTranslationHandler,
}) => (
  // payload is the source (source text), translationID and suggested translation
  // for suggest
  <Box sx={{ width: "100%" }}>
    <Box p={2} display="flex" alignItems="flex-start" bgcolor="#eeeeee">
      {/* // suggestAnEdit ? ( // "hey" // ) : */}
      <TextField
        inputRef={suggestAnEditRef}
        fullWidth
        multiline
        fullWidth
        minRows={3}
        value={translationText}
        lang={translationLanguage}
        variant="standard" // <== to enable us disable border
        sx={{ fontSize: 22, fontWeight: 500, color: "#474747" }}
        inputProps={{ style: { textAlign: "right" } }} // to align text to the right
        onChange={suggestTranslationHandler}
        onKeyDown={(event) => {
          if (!suggestAnEdit) event.preventDefault();
        }} // <== disable typing in react input
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

    {suggestAnEdit ? (
      // edit translation action/info
      <Box bgcolor="#eeeeee" display="flex" flexDirection="column" alignItems="flex-end">
        <Stack direction="row">
          <Button sx={{ textTransform: "capitalize" }}>Cancel</Button>
          <Button sx={{ textTransform: "capitalize" }}>Submit</Button>
        </Stack>
        <Alert icon={false} severity="info" sx={{ backgroundColor: "#E4E4E4", marginBottom: 5 }}>
          Your contribution will be used to improve translation quality and may be shown (without identifying you) to other users.{" "}
          <Link href="/">
            <a style={{ color: "#1197c0" }}>Learn more</a>
          </Link>
        </Alert>
      </Box>
    ) : (
      //  translation footer
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
    )}
  </Box>
);

export default Translation;
