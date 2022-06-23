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
      styleOverrides: {
        root: {
          "-webkit-user-select": "text" /* Chrome, Opera, Safari */,
          "-moz-user-select": "text" /* Firefox 2+ */,
          "-ms-user-select": "text" /* IE 10+ */,
          "user-select": "text" /* Standard syntax */,
          // border: "3px solid red !important",
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
