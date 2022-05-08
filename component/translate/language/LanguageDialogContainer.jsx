import { useState } from "react";

import { LanguageDialog } from ".";
import languages from "@source/languages";

const LanguageDialogContainer = ({ displayLangDialog, displayDialogHandler, selectedLanguage, handleLanguageChange, dialogTarget }) => {
  const [searchLanguage, setSearchLanguage] = useState("");

  const [languageOptions, setLanguageOptions] = useState(languages);

  const hideLanguageDialog = () => displayDialogHandler({ hide: true });

  const searchLanguageHandler = (e) => {
    const value = e.target.value;
    setSearchLanguage(value);

    // display only languages containing search text
    setLanguageOptions(languages.filter((language) => language.toLowerCase().includes(value.toLowerCase())));
  };

  const selectLanguageHandler = (language) => () => {
    handleLanguageChange({ target: dialogTarget, value: language });
    hideLanguageDialog();
  };

  return (
    <LanguageDialog
      {...{
        searchLanguage,
        languageOptions,
        selectedLanguage,
        displayLangDialog,
        hideLanguageDialog,
        searchLanguageHandler,
        selectLanguageHandler,
      }}
    />
  );
};
export default LanguageDialogContainer;
