import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";

import MicIcon from "@mui/icons-material/Mic";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import Tooltip from "@mui/material/Tooltip";

import StarBorderSharpIcon from "@mui/icons-material/StarBorderSharp";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";

const languageOptions = ["English", "French", "Spanish"];

const TextTranslator = () => {
  const [activeSourceLanguageTab, setActiveSourceLanguageTab] = useState("English");

  const [sourceText, setSourceText] = useState("");

  const handleSourceLanguageTabChange = (event, newValue) => {
    setActiveSourceLanguageTab(newValue);
  };

  const handleFromTextChange = ({ target: { value } }) => setSourceText(value);

  return (
    <Box sx={{ width: "100%" }}>
      <Box display="flex" alignItems="center" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tooltip title="Swap Languages (Ctrl_Shift+S)" arrow>
          {/* margin left to put swap at center of source&translation */}
          <IconButton aria-label="listen" sx={{ ml: -2.5 }}>
            <SwapHorizSharpIcon />
          </IconButton>
        </Tooltip>
        <Tabs
          value={activeSourceLanguageTab}
          onChange={handleSourceLanguageTabChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto">
          {languageOptions.map((label) => (
            <Tab
              value={label}
              key={label}
              label={
                <Typography fontWeight={600} color="text.secondary">
                  {label}
                </Typography>
              }
            />
          ))}
        </Tabs>
      </Box>
      <Box p={2} alignItems="flex-start" display="flex" bgcolor="#eeeeee">
        <Input
          fullWidth
          multiline
          disableUnderline={true}
          minRows={4}
          fullWidth
          value={sourceText}
          // to align text to the right
          inputProps={{ style: { textAlign: "right" } }}
          sx={{ fontSize: 22, fontWeight: 500, color: "#474747" }}
          onChange={handleFromTextChange}
        />
        <Tooltip title="Clear source text" arrow sx={{ ml: 1 }}>
          <IconButton aria-label="clear-source-text">
            <StarBorderSharpIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box display="flex" alignItems="center" bgcolor="#eeeeee" pb={1}>
        <Tooltip title="Listen" arrow>
          <IconButton aria-label="listen">
            <VolumeUpIcon />
          </IconButton>
        </Tooltip>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Turn on Virtual Keyboard" arrow>
          <IconButton aria-label="turn-on-virtual-keyboard">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Turn on Virtual Keyboard" arrow>
          <IconButton aria-label="turn-on-virtual-keyboard">
            <ThumbsUpDownOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Turn on Virtual Keyboard" arrow>
          <IconButton aria-label="turn-on-virtual-keyboard">
            <ShareIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TextTranslator;
