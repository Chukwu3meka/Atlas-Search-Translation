import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Translation, SourceText } from ".";

const languageOptions = ["English", "French", "Spanish"];

const TextTranslator = () => {
  const [sourceText, setSourceText] = useState(""),
    [translationText, setTranslationText] = useState(""),
    [sourceLanguage, setSourceLanguage] = useState("English"),
    [translationSaved, setTranslationSaved] = useState(false),
    [translationLanguage, setTranslationLanguage] = useState("French");

  const handleLanguageChange = ({ target, value }) => {
    // functions can be called from any point in the program as they are already loaded
    if (target === "source") {
      setSourceLanguage(value);
      if (value === translationLanguage) swapLanguageHandler();
    }
    if (target === "translation") {
      setTranslationLanguage(value);
      if (value === sourceLanguage) swapLanguageHandler();
    }
  };

  const clearTextHandler = () => setSourceText("");

  const saveTranslationHandler = () => setTranslationSaved(!translationSaved);

  const copyTranslationHandler = () => navigator && navigator.clipboard.writeText(translationText);

  const swapLanguageHandler = () => {
    // regardless of call useState(set state)hook takes effect after function call
    setSourceLanguage(translationLanguage);
    setTranslationLanguage(sourceLanguage);
  };

  const handleSourceTextChange = ({ target: { value } }) => {
    setSourceText(value);
    setTranslationText(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <SourceText {...{ sourceText, clearTextHandler, handleSourceTextChange }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Translation {...{ translationText, translationSaved, copyTranslationHandler, saveTranslationHandler }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextTranslator;
