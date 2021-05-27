import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProvideAuth } from './hooks/useAuth';

import Routes from './routes';

function App() {
  const theme = createMuiTheme({
    palette: {
      background: {
        default: '#202020',
      },
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
