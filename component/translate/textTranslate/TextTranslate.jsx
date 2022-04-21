import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";

import MicIcon from "@mui/icons-material/Mic";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import Tooltip from "@mui/material/Tooltip";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Translation, SourceText } from ".";

const languageOptions = ["English", "French", "Spanish"];

const TextTranslator = () => {
  const [activeSourceLanguageTab, setActiveSourceLanguageTab] = useState("English");
  const [translationSaved, setTranslationSaved] = useState(false);
  const [sourceText, setSourceText] = useState("");
  const [translationText, setTranslationText] = useState("");
  const handleSourceLanguageTabChange = (event, newValue) => {
    setActiveSourceLanguageTab(newValue);
  };

  const handleSourceTextChange = ({ target: { value } }) => {
    setSourceText(value);
    setTranslationText(value);
  };

  const clearTextHandler = () => setSourceText("");

  const saveTranslationHandler = () => {
    setTranslationSaved(!translationSaved);
  };

  const copyTranslationHandler = () => {
    if (navigator) navigator.clipboard.writeText(translationText);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <SourceText
            {...{
              clearTextHandler,
              activeSourceLanguageTab,
              setActiveSourceLanguageTab,
              sourceText,
              setSourceText,
              handleSourceLanguageTabChange,
              handleSourceTextChange,
              languageOptions,
              translationSaved,
              saveTranslationHandler,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Translation {...{ translationSaved, translationText, saveTranslationHandler, copyTranslationHandler }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextTranslator;
