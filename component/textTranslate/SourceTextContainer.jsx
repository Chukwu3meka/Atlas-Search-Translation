import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { SourceText } from ".";
import { fetcher } from "@utils/clientFuncs";
import { setTextTranslationAction } from "@store/actions";

const TextTranslator = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    { setTextTranslationAction } = props,
    [speaking, setSpeaking] = useState(false),
    [sourceText, setSourceText] = useState(""),
    [textTranslation, setTextTranslation] = useState(""),
    [sourceLanguage, setSourceLanguage] = useState(props.sourceLanguage),
    [translationLanguage, setTranslationLanguage] = useState(props.translationLanguage);

  //detect language change
  useEffect(() => {
    setSourceLanguage(props.sourceLanguage);
    setTranslationLanguage(props.translationLanguage);
  }, [props.sourceLanguage, props.translationLanguage]);

  //translation change
  useEffect(() => {
    setTextTranslation(props.textTranslation);
  }, [props.textTranslation]);

  // run translation again only when language is changed
  useEffect(() => {
    if (sourceText) handleSourceTextChange(sourceText);
  }, [sourceLanguage, translationLanguage]);

  const clearTextHandler = () => setSourceText("");

  const handleSourceTextChange = async (value) => {
    setSourceText(value);
    if (!value.length) {
      // text.query cannot be empty so we add a condition to check if value is greter than one
      // enqueueSnackbar("Text to be translated cannot be empty", { variant: "error" });
    } else if (value.length > 5000) {
      // we've limited the length of transfer to 5000 characters, so a condition is also included
      enqueueSnackbar("Text to be translated cannot exceed 5000 characters", { variant: "warning" });
    } else {
      setTextTranslationAction(() => {
        if (textTranslation === "no translation found") {
          // check if translation is not found
          return "no translation found";
        } else if (textTranslation?.endsWith("...")) {
          // check if translation is ongoing
          return textTranslation;
        } else {
          return `${textTranslation}...`;
        }
      });

      const { translation, id } = await fetcher("/translation/searchTranslation", {
        sourceLanguage,
        sourceText: value,
        translationLanguage,
      });

      setTextTranslationAction({ id, translation, source: value });
    }
  };

  return <SourceText {...{ sourceText, clearTextHandler, handleSourceTextChange, sourceLanguage, speaking, setSpeaking }} />;
};

const mapStateToProps = (state) => ({
    sourceLanguage: state.language.sourceLanguage,
    textTranslation: state.textTranslation.translation,
    translationLanguage: state.language.translationLanguage,
  }),
  mapDispatchToProps = { setTextTranslationAction };

export default connect(mapStateToProps, mapDispatchToProps)(TextTranslator);
