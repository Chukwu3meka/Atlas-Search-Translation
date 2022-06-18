import { TextField } from "@mui/material";
import { useState } from "react";

export default () => {
  const [value, setValue] = useState("");

  const handleSourceTextChange = (e, value) => {
    console.log("dasdsda", e.target.value, value);

    // setValue(value);
  };

  return (
    <>
      <TextField
        multiline
        minRows={3}
        fullWidth
        value={value}
        // size={122}
        variant="standard" // <== to enable us disable border
        // onChange={(e) => handleSourceTextChange(e.target.value)}
        onChange={(e, value) => handleSourceTextChange(e, value)}
        sx={{ fontSize: 122, fontWeight: 500, color: "#474747" }}
        inputProps={{ style: { fontSize: 22 } }} // font size of input text
        InputProps={{
          style: { fontSize: 22 }, // font size of input label
          // disableUnderline: true, // <== to hide underline in standard TextField variant
        }}
      />
    </>
  );
};
