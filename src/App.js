import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { ProvideAuth } from './hooks/useAuth';

import Routes from './routes';

function App() {
  const theme = createMuiTheme({
    palette: {
      background: {
        default: '#151515',
        light: '#212121',
      },
      primary: {
        main: '#d32f2f',
      },
      divider: '#393939',
    },
    overrides: {
      MuiContainer: {
        root: {
          paddingTop: '24px',
          paddingBottom: '24px',
          color: 'white',
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProvideAuth>
        <Routes />
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default App;
