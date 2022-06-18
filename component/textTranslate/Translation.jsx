import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import StopIcon from "@mui/icons-material/Stop";
import ShareIcon from "@mui/icons-material/Share";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StarSharpIcon from "@mui/icons-material/StarSharp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StarBorderSharpIcon from "@mui/icons-material/StarBorderSharp";

import { stopTextToSpeechHandler, textToSpeechHandler } from "@utils/clientFuncs";
import { VoteContainer, SuggestionContainer } from ".";

const Translation = ({
  speaking,
  sourceText,
  setSpeaking,
  suggestAnEdit,
  translationText,
  translationSaved,
  translationLanguage,
  translating,
  copyTranslationHandler,
  saveTranslationHandler,
}) => (
  <Box width="100%" height="100%" display="flex" bgcolor="#eeeeee" flexDirection="column" justifyContent="space-between">
    {suggestAnEdit ? (
      <SuggestionContainer />
    ) : (
      <Box p={2} display="flex" alignItems="flex-start">
        <Typography flexGrow={1} sx={{ fontSize: 21, fontWeight: 500, color: "#474747", minHeight: 120 }}>
          {translating
            ? translationText === "no translation found"
              ? "translating..."
              : translationText
              ? `${translationText}...`
              : "translating..."
            : translationText}
        </Typography>
        <Tooltip title="Save Translation" sx={{ ml: 1 }} onClick={saveTranslationHandler}>
          <IconButton aria-label="save-translation">
            {translationSaved ? <StarSharpIcon color="secondary" /> : <StarBorderSharpIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    )}

    {/* translation footer */}
    {!suggestAnEdit && sourceText ? (
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
        <VoteContainer />
        <Tooltip title="Share translation">
          <IconButton aria-label="share-translation">
            <ShareIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    ) : (
      ""
    )}
  </Box>
);

export default Translation;
