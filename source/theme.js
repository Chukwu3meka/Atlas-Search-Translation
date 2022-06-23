import { createTheme } from "@mui/material/styles";

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
    MuiTextField: {
      // defaultProps: {
      //   InputProps: {
      //     "-webkit-user-select": "text" /* Chrome, Opera, Safari */,
      //     "-moz-user-select": "text" /* Firefox 2+ */,
      //     "-ms-user-select": "text" /* IE 10+ */,
      //     "user-select": "text" /* Standard syntax */,
      //   },
      //   inputProps: {
      //     "-webkit-user-select": "text" /* Chrome, Opera, Safari */,
      //     "-moz-user-select": "text" /* Firefox 2+ */,
      //     "-ms-user-select": "text" /* IE 10+ */,
      //     "user-select": "text" /* Standard syntax */,
      //   },
      // },
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
    },
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
