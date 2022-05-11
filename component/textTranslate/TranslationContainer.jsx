import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState, useRef } from "react";

import { Translation } from ".";

const TranslationContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    suggestAnEditRef = useRef(null),
    [speaking, setSpeaking] = useState(false),
    [suggestAnEdit, setSuggestAnEdit] = useState(false),
    [translationText, setTranslationText] = useState(""),
    [translationSaved, setTranslationSaved] = useState(false),
    [translationLanguage, setTranslationLanguage] = useState("French");

  const [translationID, setTranslationID] = useState(null);
  const [voteStatus, setVoteStatus] = useState(0);

  // detect text translation change
  useEffect(() => setTranslationText(props.textTranslation), [props.textTranslation]);

  // detect translation language change
  useEffect(() => setTranslationLanguage(props.translationLanguage), [props.translationLanguage]);

  // detect status of suggestAnEdit
  useEffect(() => {
    setSuggestAnEdit(props.suggestAnEdit);
    setTimeout(() => suggestAnEditRef.current.focus(), 100);
  }, [props.suggestAnEdit]);

  const suggestTranslationHandler = (e) => {
    // update translation only when suggestAnEdit is not enabled
    if (suggestAnEdit) {
      const value = e.target.value;
      setTranslationText(value);
    }
  };

  // detect vote event
  useEffect(() => {
    setVoteStatus(() => {
      // if upvoted, set voteStatus to 1
      // if not voted, set voteStatus to 0
      // if downvoted, set voteStatus to -1
      props.goodTranslations.includes(translationID) ? 1 : props.poorTranslations.includes(translationID) ? -1 : 0;
    });
  }, [props.goodTranslations, props.poorTranslations]);

  // detect when translationId has changed
  useEffect(() => setTranslationID(props.translationID), [props.translationID]);

  const saveTranslationHandler = () => setTranslationSaved(!translationSaved);

  const copyTranslationHandler = () => {
    if (translationText === "no translation found") {
      enqueueSnackbar("Please wait, while we translate", { variant: "info" });
    } else if (navigator) {
      navigator.clipboard.writeText(translationText);
      enqueueSnackbar("Translation copied", { variant: "default" });
    } else {
      enqueueSnackbar("Nothing to copy", { variant: "info" });
    }
  };
  return (
    <Translation
      {...{
        speaking,
        voteStatus,
        setSpeaking,
        suggestAnEdit,
        translationText,
        suggestAnEditRef,
        translationSaved,
        translationLanguage,
        copyTranslationHandler,
        saveTranslationHandler,
        suggestTranslationHandler,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    translationID: state.textTranslation.id,
    suggestAnEdit: state.textTranslation.suggestAnEdit,
    textTranslation: state.textTranslation.translation,
    translationLanguage: state.language.translationLanguage,
    goodTranslations: state.textTranslation.goodTranslations,
    poorTranslations: state.textTranslation.poorTranslations,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TranslationContainer);
