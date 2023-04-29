import "@/styles/globals.css";
import "react-quill/dist/quill.snow.css";
import theme from "@/util/Theme";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Carousel
import "react-multi-carousel/lib/styles.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <StyledEngineProvider injectFirst>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <ToastContainer position="bottom-left" />
        </ThemeProvider>
      </SessionProvider>
    </StyledEngineProvider>
  );
}
