import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { SourceText } from ".";
import { fetcher } from "@utils/clientFuncs";
import { setTranslationAction, enableSuggestAnEditAction, setTranslatingAction } from "@store/actions";

const TextTranslator = (props) => {
  const { setTranslationAction, enableSuggestAnEditAction, setTranslatingAction } = props,
    { enqueueSnackbar } = useSnackbar(),
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
    enableSuggestAnEditAction(false); // <= disable suggest an edit from redux store, once i type in the source container
    setSourceText(value);

    if (!value.length) {
      // text.query cannot be empty so we add a condition to check if value is greter than one
      // enqueueSnackbar("Text to be translated cannot be empty", { variant: "error" });
    } else if (value.length > 5000) {
      // we've limited the length of transfer to 5000 characters, so a condition is also included
      enqueueSnackbar("Text to be translated cannot exceed 5000 characters", { variant: "warning" });
    } else {
      setTranslatingAction(true);

      await fetcher("/textTranslations/searchTranslation", {
        sourceLanguage,
        sourceText: value,
        translationLanguage,
      })
        .then((translation) => setTranslationAction(translation))
        .catch((e) => setTranslationAction({ query: value, result: "translation not found" }));

      setTranslatingAction(false);
    }
  };

  return <SourceText {...{ sourceText, clearTextHandler, handleSourceTextChange, sourceLanguage, speaking, setSpeaking }} />;
};

const mapStateToProps = (state) => ({
    sourceLanguage: state.language.sourceLanguage,
    textTranslation: state.textTranslation.translation,
    translationLanguage: state.language.translationLanguage,
  }),
  mapDispatchToProps = { setTranslatingAction, setTranslationAction, enableSuggestAnEditAction };

export default connect(mapStateToProps, mapDispatchToProps)(TextTranslator);
