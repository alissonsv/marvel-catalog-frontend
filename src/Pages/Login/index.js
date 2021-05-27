import {
  Box, Button, Container, Link as LinkMui, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0px 10px 13px -7px',
  },
  logo: {
    maxWidth: '100px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#ec1d27',
    '&:hover': {
      backgroundColor: '#800000',
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  if (auth.user) {
    return <Redirect to="/" />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await auth.login(email, password);
  }

  return (
    <Box className={classes.root}>
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <img src="/logo.png" alt="logo" className={classes.logo} />
          <Typography variant="h5">
            Login
          </Typography>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <LinkMui component={Link} to="/register" variant="body2">
              Dont have an account? Sign Up
            </LinkMui>
          </form>
        </div>
      </Container>
    </Box>
  );
}
