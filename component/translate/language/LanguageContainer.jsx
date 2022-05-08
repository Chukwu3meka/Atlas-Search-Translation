import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { Language, LanguageDialogContainer } from ".";
import { setSourceLanguageAction, setTranslationLanguageAction } from "@store/actions";

const LanguageContainer = ({ setSourceLanguageAction, setTranslationLanguageAction }) => {
  const [dialogTarget, setDialogTarget] = useState(),
    [mobileDevice, setMobileDevice] = useState(true),
    [displayLangDialog, setDisplayLangDialog] = useState(false),
    [sourceLanguage, setSourceLanguage] = useState("English"), // default language already in redux store
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

  const displayDialogHandler = ({ dialogTarget, hide }) => {
    if (hide) return setDisplayLangDialog(false);

    // set target ("source" or "translation")
    setDialogTarget(dialogTarget);

    // set display dialog to true online on mobile devices
    setDisplayLangDialog((displayLangDialog) => (mobileDevice ? !displayLangDialog : false));
  };

  return (
    <>
      <Language
        {...{
          mobileDevice,
          sourceLanguage,
          handleLanguageChange,
          swapLanguageHandler,
          translationLanguage,
          displayDialogHandler,
        }}
      />
      <LanguageDialogContainer
        dialogTarget={dialogTarget}
        displayLangDialog={displayLangDialog}
        displayDialogHandler={displayDialogHandler}
        handleLanguageChange={handleLanguageChange}
        selectedLanguage={dialogTarget === "source" ? sourceLanguage : translationLanguage}
      />
    </>
  );
};

const mapStateToProps = (state) => ({}),
  mapDispatchToProps = { setSourceLanguageAction, setTranslationLanguageAction };

export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);
