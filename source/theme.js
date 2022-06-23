import { createTheme } from "@mui/material/styles";

const iPhoneInput = {
  styleOverrides: {
    root: {
      "*": {
        "-webkit-user-select": "text !important" /* Chrome, Opera, Safari */,
        "-moz-user-select": "text !important" /* Firefox 2+ */,
        "-ms-user-select": "text !important" /* IE 10+ */,
        "user-select": "text !important" /* Standard syntax */,
        // borderLeftWidth: 6,
        // padding: "4px !important", // override inline-style
      },
    },
  },
};

const muiTheme = createTheme({
  typography: {
    fontFamily: "'Playfair Display', serif",
  },

  palette: {
    // primary: {
    //   main: "#e2ad26",
    //   main: "#e2ad26",
    // },
    // secondary: {
    // main: "#1197c0",
    // main: "#e2ad26",
    // },
  },

  components: {
    MuiTextField: iPhoneInput,
    MuiInput: iPhoneInput,
    MuiFilledInput: iPhoneInput,
    MuiOutlinedInput: iPhoneInput,
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 5,
          boxSizing: "border-box",
          // borderRadius: 8,
        },
      },
    },
  },
});

export default muiTheme;
