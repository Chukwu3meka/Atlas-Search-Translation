import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Translation } from ".";

const TextTranslator = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    [speaking, setSpeaking] = useState(false),
    [translationText, setTranslationText] = useState(""),
    [translationSaved, setTranslationSaved] = useState(false),
    [translationLanguage, setTranslationLanguage] = useState("French");

  // detect text translation change
  useEffect(() => setTranslationText(props.textTranslation), [props.textTranslation]);
  // detect translation language change
  useEffect(() => setTranslationLanguage(props.translationLanguage), [props.translationLanguage]);

  const saveTranslationHandler = () => setTranslationSaved(!translationSaved);

  const copyTranslationHandler = () => {
    if (navigator) {
      navigator.clipboard.writeText(translationText);
      enqueueSnackbar("Translation copied", { variant: "default" });
    }
  };
  return (
    <Translation
      {...{
        speaking,
        setSpeaking,
        translationText,
        translationSaved,
        translationLanguage,
        copyTranslationHandler,
        saveTranslationHandler,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    textTranslation: state.translation.textTranslation,
    translationLanguage: state.language.translationLanguage,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TextTranslator);
