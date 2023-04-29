import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34d399",
      secondary: "#60a5fa",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Prompt",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
