import ErrorPage from "next/error";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";

import { Suggestions } from ".";
import { fetcher } from "@utils/clientFuncs";
import { Button } from "@mui/material";
import Router from "next/router";
import useSkipFirstEffect from "@component/others/useSkipFirstEffects";

const suggestionsContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    [session, setSession] = useState(null),
    [disabled, setDisabled] = useState([]),
    [suggestions, setSuggestions] = useState([]),
    [hasNextDoc, setHasNextDoc] = useState(false),
    [hasAdminRight, setHasAdminRight] = useState(false);

  // const firstRenderRef = useRef(true);
  // const [name, setName] = useState("");

  // useEffect(() => {
  //   if (firstRenderRef.current) {
  //     firstRenderRef.current = false;
  //   } else {
  //     alert("Hi " + name);
  //   }
  // }, [name]);

  const firstRenderRef = useRef(true);

  // useEffect(() => {
  //   if (firstRenderRef.current) {
  //     firstRenderRef.current = false;
  //   } else {
  //     // alert('Hi ' + name);
  //     fetchTextSuggestions();
  //   }
  // }, []);

  // useSkipFirstEffect(() => {
  //   fetchTextSuggestions();
  // }, []);

  useEffect(() => {
    fetchTextSuggestions();
  }, []);

  const fetchTextSuggestions = async () => {
    console.log("here 2");

    await fetcher(`/admin/fetchTextSuggestion`, {
      lastDocId: suggestions?.length ? suggestions[suggestions.length - 1]._id : null,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    // if (!propsSession && !hasNextDoc) return;
    // const {
    //   error,
    //   hasNextDoc: newHasNextDoc,
    //   suggestions: moreSuggestions,
    // } = await fetcher(`/admin/fetchSuggestion`, {
    //   initialRequest: !!propsSession,
    //   session: propsSession || session,
    //   lastDocId: suggestions?.length ? suggestions[suggestions.length - 1]._id : null,
    // });
    // if (error) return enqueueSnackbar(error.label || "An error occured", { variant: "error" });
    // console.log("Ads");
    // setHasNextDoc(newHasNextDoc);
    // setSuggestions((suggestions) => [...suggestions, ...moreSuggestions]);
  };

  return "hey";

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
      fetchSuggestions={fetchTextSuggestions}
      reviewTranslationHandler={reviewTranslationHandler}
    />
  ) : (
    <ErrorPage statusCode={404} />
  );
};

// const mapStateToProps = (state) => ({
//     userData: state.auth.userData,
//     session: state.auth.session,
//   }),
//   mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(suggestionsContainer);

export default suggestionsContainer;
