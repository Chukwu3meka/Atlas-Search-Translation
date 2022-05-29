import ErrorPage from "next/error";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { Suggestions } from ".";
import { fetcher } from "@utils/clientFuncs";

const suggestionsContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    [session, setSession] = useState(null),
    [disabled, setDisabled] = useState([]),
    [hasNextDoc, setHasNextDoc] = useState(false),
    [suggestions, setSuggestions] = useState([]),
    [hasAdminRight, setHasAdminRight] = useState(false);

  useEffect(() => {
    setSession(props.session);
    setHasAdminRight(props.session ? ["admin", "superAdmin"].includes(props.userData.role) : false);
    // we need session id to make  fetch request to our admin API
    if (!suggestions.length && props.session) fetchSuggestions(props.session);
  }, [props.userData]);

  const fetchSuggestions = async (propsSession) => {
    console.log(!propsSession && !hasNextDoc);
    if (!propsSession && !hasNextDoc) return;

    const {
      error,
      hasNextDoc: newHasNextDoc,
      suggestions: moreSuggestions,
    } = await fetcher(`/admin/fetchSuggestion`, {
      initialRequest: !!propsSession,
      session: propsSession || session,
      lastDocId: suggestions?.length ? suggestions[suggestions.length - 1]._id : null,
    });

    if (error) return enqueueSnackbar(error.label || "An error occured", { variant: "error" });

    console.log("Ads");

    setHasNextDoc(newHasNextDoc);
    setSuggestions((suggestions) => [...suggestions, ...moreSuggestions]);
  };

  const reviewTranslationHandler =
    ({ _id, review, sourceText, sourceLanguage, translationLanguage, suggestedTranslation }) =>
    async () => {
      try {
        // add suggestion from disbaled
        setDisabled((disabled) => [...disabled, _id]);

        const { error } = await fetcher(`/admin/${review ? "approveSuggestion" : "rejectSuggestion"}`, {
          _id,
          session,
          sourceText,
          sourceLanguage,
          translationLanguage,
          suggestedTranslation,
        });

        if (error) throw { label: error };

        //  remove suggestion from list if approval/rejection is succesfull
        setSuggestions((suggestions) => suggestions.filter((suggestion) => suggestion._id !== _id));

        enqueueSnackbar(`Suggestion ${review ? "Approved" : "Rejected"}`, { variant: "success" });
      } catch (error) {
        // remove suggestion from disbaled
        setDisabled((disabled) => disabled.filter((id) => id !== _id));

        if (error && error.label) return enqueueSnackbar(error.label, { variant: "error" });
        enqueueSnackbar("An error occured", { variant: "error" });
      }
    };

  return hasAdminRight ? (
    <Suggestions
      hasNextDoc={hasNextDoc}
      disabled={disabled}
      suggestions={suggestions}
      fetchSuggestions={fetchSuggestions}
      reviewTranslationHandler={reviewTranslationHandler}
    />
  ) : (
    <ErrorPage statusCode={404} />
  );
};

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
    session: state.auth.session,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(suggestionsContainer);

const propsSuggestions = [
  {
    _id: "AAA",
    date: "asDS",
    sourceLanguage: "english",
    sourceText:
      "Quis dolore ad aliquip veniam. Exercitation dolore commodo occaecat elit officia minim Adipisicing esse eu tempor cillum voluptate ad cupidatat incididunt labore.",
    translationLanguage: "french",
    translationText:
      "Tempor quis ad commodo ad irure excepteur non quis duis eiusmod Lorem irure. Ut reprehenderit do cillum ipsum amet et ut amet do id ea dolore aliquip. Sunt ullamco eiusmod dolore ipsum commodo consectetur incididunt laborum magna.",
    suggestedTranslation:
      "Minim consectetur qui excepteur ullamco minim laborum reprehenderit pariatur tempor amet elit voluptate irure aliquip in ex veniam ullamco culpa. Elit deserunt quis velit ex consectetur.",
  },
  {
    _id: "AAA2121",
    date: "asDS12",
    sourceLanguage: "french",
    sourceText:
      "Non laborum magna pariatur esse consectetur officia excepteur consequat. Pariatur commodo  fugiat et velit ad ea sint excepteur do.",
    translationLanguage: "spanish",
    translationText:
      "Irure nostrud ut voluptate est ad exercitation aliquip culpa veniam sint. Deserunt veniam officia ex excepteur consectetur.",
    suggestedTranslation:
      "Enim tempor tempor duis qui do commodo officia proident nisi reprehenderit et velit nisi. quis non ea consectetur.",
  },
  {
    _id: "AAA21211",
    date: "asDS121",
    sourceLanguage: "english",
    sourceText:
      "Ea qui id voluptate adipisicing incididunt consequat voluptate voluptate tempor ullamco consectetur magna culpa. Eiusmod in fugiat minim anim amet.",
    translationLanguage: "spanish",
    translationText: "Amet enim commodo mollit deserunt ad proident consectetur tempor adipisicing culpa  commodo aute eu aliquip.",
    suggestedTranslation:
      "Irure officia mollit commodo consectetur id exercitation in eiusmod non eu. Culpa aliquip  minim aliquip sint et.",
  },
];
