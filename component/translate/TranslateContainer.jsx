import { Translate } from ".";

import TranslateIcon from "@mui/icons-material/Translate";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import LanguageIcon from "@mui/icons-material/Language";

const mainButtons = [
  { label: "Text", icon: <TranslateIcon /> },
  { label: "Documents", icon: <PlagiarismIcon /> },
  { label: "Websites", icon: <LanguageIcon /> },
];

const TranslateContainer = () => {
  return <Translate mainButtons={mainButtons} />;
};

export default TranslateContainer;
