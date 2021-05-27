import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
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
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProvideAuth>
        <Router>
          <Routes />
        </Router>
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default App;
