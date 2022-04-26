import { Translate } from ".";

import TranslateIcon from "@mui/icons-material/Translate";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import LanguageIcon from "@mui/icons-material/Language";

import { useState } from "react";

const translateOptions = [
  { label: "Text", icon: <TranslateIcon /> },
  // { label: "Documents", icon: <PlagiarismIcon /> },
  // { label: "Websites", icon: <LanguageIcon /> },
];

const TranslateContainer = () => {
  const [translateType, setTranslateType] = useState("Text");

  const translateTypeHandler = (value) => () => setTranslateType(value);

  return <Translate translateOptions={translateOptions} translateType={translateType} translateTypeHandler={translateTypeHandler} />;
};

export default TranslateContainer;
