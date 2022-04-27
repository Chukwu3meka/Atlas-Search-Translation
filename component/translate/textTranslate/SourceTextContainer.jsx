import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { SourceText } from ".";
import { fetcher } from "@utils/clientFuncs";
import { setTextTranslationAction } from "@store/actions";

const TextTranslator = (props) => {
  const { setTextTranslationAction } = props,
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
    // if (value.length <= 5000) {
    //   setSourceText(value);
    //   const { translation } = await fetcher("/translation/greetings", { sourceLanguage, sourceText: value, translationLanguage });
    //   setTextTranslationAction(translation);
    // }
  };

  return <SourceText {...{ sourceText, clearTextHandler, handleSourceTextChange }} />;
};

const mapStateToProps = (state) => ({
    sourceLanguage: state.language.sourceLanguage,
    translationLanguage: state.language.translationLanguage,
  }),
  mapDispatchToProps = { setTextTranslationAction };

export default connect(mapStateToProps, mapDispatchToProps)(TextTranslator);
