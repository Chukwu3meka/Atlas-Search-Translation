import Link from "next/link";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const Suggestion = ({
  language,
  suggestion,
  setSuggestion,
  disableButtons,
  suggestAnEditRef,
  submitSuggestionHandler,
  cancelSuggestAnEditHandler,
}) => (
  <>
    <Box p={2} display="flex" alignItems="flex-start">
      <TextField
        inputRef={suggestAnEditRef}
        fullWidth
        multiline
        fullWidth
        minRows={3}
        value={suggestion}
        lang={language}
        variant="standard" // <== to enable us disable border
        sx={{ fontSize: 22, fontWeight: 500, color: "#474747" }}
        inputProps={{ style: { textAlign: "right" } }} // to align text to the right
        onChange={(e) => setSuggestion(e.target.value)}
        inputProps={{ style: { fontSize: 22 } }} // font size of input text
        InputProps={{
          style: { fontSize: 22 }, // font size of input label
          disableUnderline: true, // <== to hide underline in standard TextField variant
        }}
      />
      <Tooltip title="Clear text" sx={{ ml: 1 }} onClick={() => setSuggestion("")}>
        <IconButton aria-label="clear-text">
          <CloseSharpIcon />
        </IconButton>
      </Tooltip>
    </Box>

    {/* edit translation action/info */}
    <Box bgcolor="#eeeeee" display="flex" flexDirection="column" alignItems="flex-end">
      <Stack direction="row">
        <Button sx={{ textTransform: "capitalize" }} disabled={disableButtons} onClick={cancelSuggestAnEditHandler}>
          Cancel
        </Button>
        <Button sx={{ textTransform: "capitalize" }} disabled={disableButtons} onClick={submitSuggestionHandler}>
          Submit
        </Button>
      </Stack>
      <Alert icon={false} severity="info" sx={{ backgroundColor: "#E4E4E4", marginBottom: 5 }}>
        Your contribution will be used to improve translation quality and may be shown (without identifying you) to other users.{" "}
        <Link href="/">
          <a style={{ color: "#1197c0" }}>Learn more</a>
        </Link>
      </Alert>
    </Box>
  </>
);

export default Suggestion;
