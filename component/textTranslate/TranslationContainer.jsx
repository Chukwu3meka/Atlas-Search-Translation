import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Translation } from ".";
import { enableSuggestAnEditAction } from "@store/actions";

const TranslationContainer = (props) => {
  const { enableSuggestAnEditAction } = props,
    { enqueueSnackbar } = useSnackbar(),
    [initTrans, setInitTrans] = useState(""),
    [voteStatus, setVoteStatus] = useState(0),
    [speaking, setSpeaking] = useState(false),
    [sourceText, setSourceText] = useState(""),
    [translationID, setTranslationID] = useState(null),
    [suggestAnEdit, setSuggestAnEdit] = useState(false),
    [translating, setTranslating] = useState(false),
    [translationText, setTranslationText] = useState(""),
    [translationSaved, setTranslationSaved] = useState(false),
    [translationLanguage, setTranslationLanguage] = useState("French");

  // detect sourceText  translation change
  useEffect(() => setTranslating(props.translating), [props.translating]);
  // detect sourceText  translation change
  useEffect(() => setSourceText(props.sourceText), [props.sourceText]);
  // detect text translation change
  useEffect(() => setTranslationText(props.textTranslation), [props.textTranslation]);
  // detect translation language change
  useEffect(() => setTranslationLanguage(props.translationLanguage), [props.translationLanguage]);

  // detect status of suggestAnEdit
  useEffect(() => {
    setSuggestAnEdit(props.suggestAnEdit);
    // setInitTrans(translationText); // <= save initial translationText before any editing
    // // set translationText to null if no translation was found
    // setTranslationText((translationText) => (translationText === "no translation found" ? "" : translationText));
    // setTimeout(() => {
    //   if (suggestAnEditRef.current) suggestAnEditRef.current.focus();
    // }, 100);
  }, [props.suggestAnEdit]);

  // detect vote event
  useEffect(() => {
    setVoteStatus(() => {
      // if upvoted, set voteStatus to 1 // if not voted, set voteStatus to 0 // if downvoted, set voteStatus to -1
      props.goodTranslations.includes(translationID) ? 1 : props.poorTranslations.includes(translationID) ? -1 : 0;
    });
  }, [props.goodTranslations, props.poorTranslations]);

  // detect when translationId has changed
  useEffect(() => setTranslationID(props.translationID), [props.translationID]);

  const clearTranslationHandler = () => {
    // update translation only when suggestAnEdit is not enabled
    if (suggestAnEdit) setTranslationText("");
  };

  const suggestTranslationHandler = (e) => {
    // update translation only when suggestAnEdit is not enabled
    if (suggestAnEdit) {
      const value = e.target.value;
      setTranslationText(value);
    }
  };

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

  const submitSuggestionHandler = () => {
    console.log({ sourceText, translationText, translationID });
  };

  const cancelSuggestAnEditHandler = () => {
    // disable suggest an edit from redux store, once i type in the source container
    enableSuggestAnEditAction(false);
    setTranslationText(initTrans);
  };

  return (
    <Translation
      {...{
        speaking,
        voteStatus,
        sourceText,
        setSpeaking,
        suggestAnEdit,
        translationText,
        // suggestAnEditRef,
        translating,
        translationSaved,
        cancelSuggestAnEditHandler,
        translationLanguage,
        copyTranslationHandler,
        submitSuggestionHandler,
        saveTranslationHandler,
        clearTranslationHandler,
        suggestTranslationHandler,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    translating: state.textTranslation.translating,
    textTranslation: state.textTranslation.translation.result,
    goodTranslations: state.textTranslation.goodTranslations,
    poorTranslations: state.textTranslation.poorTranslations,
    translationLanguage: state.language.translationLanguage,
    suggestAnEdit: state.textTranslation.suggestAnEdit,
    sourceText: state.textTranslation.translation.query,
  }),
  mapDispatchToProps = { enableSuggestAnEditAction };

export default connect(mapStateToProps, mapDispatchToProps)(TranslationContainer);
