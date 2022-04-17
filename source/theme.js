import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  typography: {
    fontFamily: "'Playfair Display', serif",
  },

  palette: {
    // primary: {
    //   main: "#e2ad26",
    // },
    // secondary: {
    //   main: "#1197c0",
    // },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 5,
          boxSizing: "border-box",
        },
      },
    },
  },
});

export default muiTheme;
