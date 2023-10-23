import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "../../globalStyle";
import theme from "./theme";

function MyApp({ Component, pageProps }) {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider>
          <CssBaseline />
          <GlobalStyle />
          <Component {...pageProps} />
        </StyledThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default MyApp;
