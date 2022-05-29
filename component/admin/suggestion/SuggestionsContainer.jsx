import { connect } from "react-redux";
import { Suggestions } from ".";
import ErrorPage from "next/error";
import { useState } from "react";
import { useEffect } from "react";

const suggestionsContainer = (props) => {
  const [session, setSession] = useState(null);
  const [hasAdminRight, setHasAdminRight] = useState(false);

  useEffect(() => {
    setSession(props.session);
    setHasAdminRight(props.session ? ["admin", "superAdmin"].includes(props.userData.role) : false);
  }, [props.userData]);

  const approveTranslationHandler = async () => () => {
    //
  };
  const rejectTranslationHandler = async () => () => {
    //
  };

  return hasAdminRight ? (
    <Suggestions
      suggestions={suggestions}
      rejectTranslationHandler={rejectTranslationHandler}
      approveTranslationHandler={approveTranslationHandler}
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

const suggestions = [
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
