import { createTheme } from "@mui/material/styles";

const iPhoneInput = {
  styleOverrides: {
    root: {
      "*": {
        // to prevent mui input not working on iPhone
        WebkitUserSelect: "text !important" /* Chrome, Opera, Safari */,
        MozUserSelect: "text !important" /* Firefox 2+ */,
        MsUserSelect: "text !important" /* IE 10+ */,
        userSelect: "text !important" /* Standard syntax */,
      },
    },
  },
};

const muiTheme = createTheme({
  typography: {
    fontFamily: "'Playfair Display', serif",
  },

  // palette: {
  // primary: {
  //   main: "#e2ad26",
  //   main: "#e2ad26",
  // },
  // secondary: {
  // main: "#1197c0",
  // main: "#e2ad26",
  // },
  // },

  components: {
    MuiInput: iPhoneInput,
    MuiTextField: iPhoneInput,
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
