import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";

import { Suggestions } from ".";
import { fetcher } from "@utils/clientFuncs";
import { Button } from "@mui/material";

const SuggestionsContainer = () => {
  const { enqueueSnackbar } = useSnackbar(),
    [disabled, setDisabled] = useState([]),
    [hasNext, setHasNext] = useState(false),
    [fetching, setFetching] = useState(false),
    [suggestions, setSuggestions] = useState([]);

  useEffect(() => fetchTextSuggestions(), []);

  const fetchTextSuggestions = async () => {
    setFetching(true);
    await fetcher(`/admin/fetchTextSuggestion`, { hasNext })
      .then(({ hasNext, suggestions: moreSuggestions }) => {
        setHasNext(hasNext);
        setSuggestions((suggestions) => [...suggestions, ...moreSuggestions]);
      })
      .catch((e) => enqueueSnackbar(e.message || e || "Unable to retreive suggestions", { variant: "error" }));
    setFetching(false);
  };

  const reviewTranslationHandler = async ({ _id, review }) => {
    // add suggestion from disbaled

    setDisabled((disabled) => [...disabled, _id]);

    await fetcher(`/admin/${review ? "approveSuggestion" : "rejectSuggestion"}`, { _id })
      .then(async () => {
        // fetch doc if no longer visible
        if (hasNext && !(suggestions.length - 1)) await fetchTextSuggestions();

        //  remove suggestion from list if approval/rejection is succesfull
        setSuggestions((suggestions) => suggestions.filter((suggestion) => suggestion._id !== _id));

        enqueueSnackbar(`Suggestion ${review ? "Approved" : "Rejected"}`, { variant: "success" });
      })
      .catch((error) => {
        // remove suggestion from disbaled
        setDisabled((disabled) => disabled?.filter((id) => id !== _id));
        return enqueueSnackbar(error.message || error || "Server not responding to review request", { variant: "error" });
      });
  };

  return (
    <Suggestions
      hasNext={hasNext}
      fetching={fetching}
      disabled={disabled}
      suggestions={suggestions}
      fetchTextSuggestions={fetchTextSuggestions}
      reviewTranslationHandler={reviewTranslationHandler}
    />
  );
};

export default SuggestionsContainer;
