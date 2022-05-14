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
