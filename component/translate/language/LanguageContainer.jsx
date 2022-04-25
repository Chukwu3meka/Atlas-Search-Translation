import { Language } from ".";
import { useState } from "react";

const languageOptions = ["English", "French", "Spanish"];

const LanguageContainer = () => {
  const [sourceLanguage, setSourceLanguage] = useState("English"),
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

  const swapLanguageHandler = () => {
    // regardless of call useState(set state)hook takes effect after function call
    setSourceLanguage(translationLanguage);
    setTranslationLanguage(sourceLanguage);
  };

  return <Language {...{ sourceLanguage, handleLanguageChange, languageOptions, swapLanguageHandler, translationLanguage }} />;
};

export default LanguageContainer;
