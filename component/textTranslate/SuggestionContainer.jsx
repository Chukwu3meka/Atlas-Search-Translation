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
    [srcText, setSrcText] = useState(""),
    [srcLang, setSrcLang] = useState(""),
    [transID, setTransID] = useState(null),
    [transText, setTransText] = useState(""),
    [suggestion, setSuggestion] = useState(""),
    [transLang, setTransLang] = useState("French"),
    [disableButtons, setDisableButtons] = useState(false);

  // detect 1.src/tran Text change 2. trans Id has changed 3. src/trans language change
  useEffect(() => {
    setSrcText(props.srcText);
    setTransID(props.transID);
    setSrcLang(props.srcLang);
    setTransText(props.transText);
    setTransLang(props.transLang);
    setSuggestion(props.transText);
  }, [props.srcText, props.transText, props.transID, props.transLang, props.srcLang]);

  // detect status of suggestAnEdit
  useEffect(() => {
    // set transText to null if no translation was found
    setSuggestion((suggestion) => (suggestion === "no translation found" ? "" : suggestion));
    setTimeout(() => {
      if (suggestAnEditRef.current) suggestAnEditRef.current.focus();
    }, 100);
  }, [props.suggestAnEdit]);

  const submitSuggestionHandler = async () => {
    if (!suggestion) return enqueueSnackbar("Suggestion cannot be empty", { variant: "info" });
    if (suggestion === transText) return enqueueSnackbar("Suggestion must be different from current translation", { variant: "info" });

    setDisableButtons(true);
    const { status } = await fetcher("/textTranslations/suggestTranslation", {
      sourceText: srcText,
      sourceLanguage: srcLang,
      translationText: transText,
      translationLanguage: transLang,
      translationId: transID,
      suggestedTranslation: suggestion,
    });

    if (status) {
      enqueueSnackbar("Submitted for review", { variant: "success" });
      enableSuggestAnEditAction(false);
    } else {
      enqueueSnackbar("Failed to send Suggestion", { variant: "error" });
    }

    setDisableButtons(false);
  };

  const cancelSuggestAnEditHandler = () => {
    enableSuggestAnEditAction(false);
    setSuggestion(transText); // <= grab  initial translation from transText
  };

  return (
    <Suggestion
      {...{
        transLang,
        suggestion,
        setSuggestion,
        disableButtons,
        suggestAnEditRef,
        submitSuggestionHandler,
        cancelSuggestAnEditHandler,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    transID: state.textTranslation.id,
    srcText: state.textTranslation.source,
    srcLang: state.language.sourceLanguage,
    transText: state.textTranslation.translation,
    transLang: state.language.translationLanguage,
    suggestAnEdit: state.textTranslation.suggestAnEdit,
    goodTranslations: state.textTranslation.goodTranslations,
    poorTranslations: state.textTranslation.poorTranslations,
  }),
  mapDispatchToProps = { enableSuggestAnEditAction };

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionContainer);
