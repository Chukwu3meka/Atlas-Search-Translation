import Link from "next/link";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState, useRef } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

import { enableSuggestAnEditAction } from "@store/actions";

const Suggestion = (props) => {
  const { enableSuggestAnEditAction } = props,
    suggestAnEditRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [srcText, setSrcText] = useState(""),
    [srcLang, setSrcLang] = useState(""),
    [transID, setTransID] = useState(null),
    [transText, setTransText] = useState(""),
    [suggestion, setSuggestion] = useState(""),
    [transLang, setTransLang] = useState("French");

  // detect 1.src/tran Text change 2. trans Id has changed 3. src/trans language change
  useEffect(() => {
    setSrcText(props.srcText);
    setTransID(props.transID);
    setSrcLang(props.srcLang);
    setTransText(props.transText);
    setTransLang(props.transLang);
    setSuggestion(props.transText);
  }, [props.srcText, props.transText, props.transID, props.transLang, props.srcLang]);

  // detect status of suggestAnEdit
  useEffect(() => {
    // set transText to null if no translation was found
    setSuggestion((suggestion) => (suggestion === "no translation found" ? "" : suggestion));
    setTimeout(() => {
      if (suggestAnEditRef.current) suggestAnEditRef.current.focus();
    }, 100);
  }, [props.suggestAnEdit]);

  const submitSuggestionHandler = () => {
    if (!suggestion) return enqueueSnackbar("Suggestion cannot be empty", { variant: "info" });
    if (suggestion === transText) return enqueueSnackbar("Suggestion must be different from current translation", { variant: "info" });

    // suggestTranslation

    console.log(
      // { srcText, transText, suggestion, transID, srcLang },
      {
        sourceText: srcText,
        sourceLanguage: srcLang,
        translationText: transText,
        translationLanguage: transLang,
        translationId: transID,
        suggestedTranslation: suggestion,
      }
    );
    enqueueSnackbar("Suggestion submitted successfully", { variant: "success" });
  };

  const cancelSuggestAnEditHandler = () => {
    enableSuggestAnEditAction(false);
    setSuggestion(transText); // <= grab  initial translation from transText
  };

  return (
    <>
      <Box p={2} display="flex" alignItems="flex-start">
        <TextField
          inputRef={suggestAnEditRef}
          fullWidth
          multiline
          fullWidth
          minRows={3}
          value={suggestion}
          lang={transLang}
          variant="standard" // <== to enable us disable border
          sx={{ fontSize: 22, fontWeight: 500, color: "#474747" }}
          inputProps={{ style: { textAlign: "right" } }} // to align text to the right
          onChange={(e) => setSuggestion(e.target.value)}
          inputProps={{ style: { fontSize: 22 } }} // font size of input text
          InputProps={{
            style: { fontSize: 22 }, // font size of input label
            disableUnderline: true, // <== to hide underline in standard TextField variant
          }}
        />
        <Tooltip title="Clear text" sx={{ ml: 1 }} onClick={() => setSuggestion("")}>
          <IconButton aria-label="clear-text">
            <CloseSharpIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* edit translation action/info */}
      <Box bgcolor="#eeeeee" display="flex" flexDirection="column" alignItems="flex-end">
        <Stack direction="row">
          <Button sx={{ textTransform: "capitalize" }} onClick={cancelSuggestAnEditHandler}>
            Cancel
          </Button>
          <Button sx={{ textTransform: "capitalize" }} onClick={submitSuggestionHandler}>
            Submit
          </Button>
        </Stack>
        <Alert icon={false} severity="info" sx={{ backgroundColor: "#E4E4E4", marginBottom: 5 }}>
          Your contribution will be used to improve translation quality and may be shown (without identifying you) to other users.{" "}
          <Link href="/">
            <a style={{ color: "#1197c0" }}>Learn more</a>
          </Link>
        </Alert>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
    transID: state.textTranslation.id,
    srcText: state.textTranslation.source,
    srcLang: state.language.sourceLanguage,
    transText: state.textTranslation.translation,
    transLang: state.language.translationLanguage,
    suggestAnEdit: state.textTranslation.suggestAnEdit,
    goodTranslations: state.textTranslation.goodTranslations,
    poorTranslations: state.textTranslation.poorTranslations,
  }),
  mapDispatchToProps = { enableSuggestAnEditAction };

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
