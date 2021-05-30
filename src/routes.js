import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';

import { useAuth } from './hooks/useAuth';
import Base from './Pages/Base';
import Error404 from './Pages/Error404';
import Characters from './Pages/Characters';
import Comics from './Pages/Comics';
import Favorites from './Pages/Favorites';
import CharacterDetail from './Pages/CharacterDetail';

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

      <CustomRoute exact path="/">
        <Redirect to="/favorites" />
      </CustomRoute>

      <CustomRoute isPrivate path="/favorites">
        <Base>
          <Favorites />
        </Base>
      </CustomRoute>

      <CustomRoute isPrivate path="/characters/:id">
        <Base>
          <CharacterDetail />
        </Base>
      </CustomRoute>

      <CustomRoute isPrivate path="/characters/">
        <Base>
          <Characters />
        </Base>
      </CustomRoute>

      <CustomRoute isPrivate path="/comics/">
        <Base>
          <Comics />
        </Base>
      </CustomRoute>

      <CustomRoute isPrivate path="*">
        <Base>
          <Error404 />
        </Base>
      </CustomRoute>
    </Switch>
  );
}
