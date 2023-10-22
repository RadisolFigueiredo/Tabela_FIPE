import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import GlobalStyle from '../../globalStyle'

function MyApp({ Component, pageProps }) {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider>
        <StyledThemeProvider >
          <CssBaseline />
          <GlobalStyle />
          <Component {...pageProps} />
        </StyledThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default MyApp;
