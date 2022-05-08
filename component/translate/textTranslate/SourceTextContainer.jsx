import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { SourceText } from ".";
import { fetcher } from "@utils/clientFuncs";
import { setTextTranslationAction } from "@store/actions";

const TextTranslator = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    { setTextTranslationAction } = props,
    [sourceText, setSourceText] = useState(""),
    [sourceLanguage, setSourceLanguage] = useState(props.sourceLanguage),
    [translationLanguage, setTranslationLanguage] = useState(props.translationLanguage);

  //detect language change
  useEffect(() => {
    setSourceLanguage(props.sourceLanguage);
    setTranslationLanguage(props.translationLanguage);
  }, [props.sourceLanguage, props.translationLanguage]);

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
      const { translation } = await fetcher("/translation/greetings", { sourceLanguage, sourceText: value, translationLanguage });
      setTextTranslationAction(translation);
    }
  };

  return <SourceText {...{ sourceText, clearTextHandler, handleSourceTextChange, sourceLanguage }} />;
};

const mapStateToProps = (state) => ({
    sourceLanguage: state.language.sourceLanguage,
    translationLanguage: state.language.translationLanguage,
  }),
  mapDispatchToProps = { setTextTranslationAction };

export default connect(mapStateToProps, mapDispatchToProps)(TextTranslator);
