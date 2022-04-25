import { Language } from ".";
import { useEffect, useState } from "react";

const languageOptions = ["English", "French", "Spanish"];

const LanguageContainer = () => {
  const [mobileDevice, setMobileDevice] = useState(false),
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

  return (
    <Language {...{ sourceLanguage, handleLanguageChange, languageOptions, swapLanguageHandler, translationLanguage, mobileDevice }} />
  );
};

export default LanguageContainer;
