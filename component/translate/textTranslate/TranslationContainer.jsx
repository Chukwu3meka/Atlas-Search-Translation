import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Translation } from ".";

const TextTranslator = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    [translationText, setTranslationText] = useState(""),
    [translationSaved, setTranslationSaved] = useState(false);

  // detect text translation change
  useEffect(() => setTranslationText(props.textTranslation), [props.textTranslation]);

  const saveTranslationHandler = () => setTranslationSaved(!translationSaved);

  const copyTranslationHandler = () => {
    if (navigator) {
      navigator.clipboard.writeText(translationText);
      enqueueSnackbar("Translation copied", { variant: "default" });
    }
  };
  return <Translation {...{ translationText, translationSaved, copyTranslationHandler, saveTranslationHandler }} />;
};

const mapStateToProps = (state) => ({
    textTranslation: state.translation.textTranslation,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TextTranslator);
