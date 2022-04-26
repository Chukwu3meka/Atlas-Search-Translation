import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { Language } from ".";
import { setSourceLanguageAction, setTranslationLanguageAction } from "@store/actions";

const languageOptions = ["English", "French", "Spanish"];

const LanguageContainer = ({ setSourceLanguageAction, setTranslationLanguageAction }) => {
  const [mobileDevice, setMobileDevice] = useState(false),
    // default language already in redux store
    [sourceLanguage, setSourceLanguage] = useState("English"),
    [translationLanguage, setTranslationLanguage] = useState("French");

  useEffect(() => {
    setMobileDevice(window.innerWidth < 720);
    return () => {
      setMobileDevice(window.innerWidth < 720);
    };
  }, []);

  const handleLanguageChange = ({ target, value }) => {
    // functions can be called from any point in the program as they are already loaded
    if (target === "source") {
      setSourceLanguage(value);
      setSourceLanguageAction(value);
      if (value === translationLanguage) swapLanguageHandler();
    }
    if (target === "translation") {
      setTranslationLanguage(value);
      setTranslationLanguageAction(value);
      if (value === sourceLanguage) swapLanguageHandler();
    }
  };

  const swapLanguageHandler = () => {
    // regardless of call useState(set state)hook takes effect after function call
    setSourceLanguage(translationLanguage);
    setTranslationLanguage(sourceLanguage);
    // set store state
    setSourceLanguageAction(translationLanguage);
    setTranslationLanguageAction(sourceLanguage);
  };

  return (
    <Language {...{ sourceLanguage, handleLanguageChange, languageOptions, swapLanguageHandler, translationLanguage, mobileDevice }} />
  );
};

const mapStateToProps = (state) => ({}),
  mapDispatchToProps = { setSourceLanguageAction, setTranslationLanguageAction };

export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);
