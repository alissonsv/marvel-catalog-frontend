import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Main from './Pages/Main';

import { useAuth } from './hooks/useAuth';

// eslint-disable-next-line react/prop-types
function CustomRoute({ isPrivate, children, ...rest }) {
  const auth = useAuth();

  if (isPrivate && auth.user === null) {
    return <Redirect to="/login" />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest}>{children}</Route>;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute path="/login">
        <Login />
      </CustomRoute>
      <CustomRoute path="/register">
        <Register />
      </CustomRoute>
      <CustomRoute isPrivate exact path="/">
        <Main />
      </CustomRoute>
    </Switch>
  );
}
