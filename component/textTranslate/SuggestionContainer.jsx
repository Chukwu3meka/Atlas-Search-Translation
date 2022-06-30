import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState, useRef } from "react";

import { Suggestion } from ".";
import { fetcher } from "@utils/clientFuncs";
import { enableSuggestAnEditAction } from "@store/actions";

const SuggestionContainer = (props) => {
  const { enableSuggestAnEditAction } = props,
    suggestAnEditRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [suggestion, setSuggestion] = useState(""),
    [language, setLanguage] = useState({}),
    [translation, setTranslation] = useState({}),
    [disableButtons, setDisableButtons] = useState(false);

  useEffect(() => {
    setLanguage(props.language);
    setTranslation(props.translation);
    setSuggestion(props.translation.result);
  }, [props.language, props.translation]);

  // detect status of suggestAnEdit
  useEffect(() => {
    suggestAnEditHookHandler();
    return () => suggestAnEditHookHandler();
  }, [props.suggestAnEdit]);

  // set transText to null if no translation was found
  const suggestAnEditHookHandler = () => {
    setSuggestion((suggestion) => (suggestion === "no translation found" ? "" : suggestion));
    setTimeout(() => {
      if (suggestAnEditRef.current) suggestAnEditRef.current.focus();
    }, 100);
  };

  const submitSuggestionHandler = async () => {
    if (!suggestion) return enqueueSnackbar("Suggestion cannot be empty", { variant: "info" });
    if (suggestion === translation.result)
      return enqueueSnackbar("Suggestion must be different from current translation", { variant: "info" });

    setDisableButtons(true);
    await fetcher("/textTranslations/suggestTranslation", {
      language,
      suggestion,
      query: translation.query,
      translation: translation.result,
    })
      .then(() => {
        enqueueSnackbar("Submitted for review", { variant: "success" });
        cancelSuggestAnEditHandler();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to send Suggestion", { variant: "error" });
      });

    setDisableButtons(false);
  };

  const cancelSuggestAnEditHandler = () => {
    enableSuggestAnEditAction(false);
    setSuggestion(translation.result); // <= grab  initial translation from transText
  };

  return (
    <Suggestion
      {...{
        suggestion,
        setSuggestion,
        disableButtons,
        suggestAnEditRef,
        submitSuggestionHandler,
        cancelSuggestAnEditHandler,
        language: language.translationLanguage,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    // translation: {
    //   query: 'he',
    //   _id: '627355bf306c2f330b15f620',
    //   english: 'he',
    //   result: 'il'
    // },

    translation: state.textTranslation.translation,
    language: state.language,

    // transID: state.textTranslation.id,
    //   srcText: state.textTranslation.source,
    // srcLang: state.language.sourceLanguage,
    // transText: state.textTranslation.translation,
    // transLang: state.language.translationLanguage,
    suggestAnEdit: state.textTranslation.suggestAnEdit,
    // goodTranslations: state.textTranslation.goodTranslations,
    // poorTranslations: state.textTranslation.poorTranslations,
  }),
  mapDispatchToProps = { enableSuggestAnEditAction };

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionContainer);
