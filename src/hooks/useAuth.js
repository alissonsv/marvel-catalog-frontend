import { useState, useContext, createContext } from 'react';
import { useHistory } from 'react-router-dom';

const authContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const host = process.env.REACT_APP_API_HOST;
  const history = useHistory();

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = (email, password) => {
    fetch(`${host}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => response.json())
      .then((userJson) => {
        if (userJson.error) {
          throw new Error(userJson.error);
        }

        setUser(userJson);
        localStorage.setItem('user', JSON.stringify(userJson));
      })
      .catch((e) => e);
  };

  const register = (email, password) => {
    fetch(`${host}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => response.json())
      .then((userJson) => {
        if (userJson.error) {
          throw new Error(userJson.error);
        }

        setUser(userJson);
        localStorage.setItem('user', JSON.stringify(userJson));
      })
      .catch((e) => e);
  };

  const logout = async () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    await fetch(`${host}/api/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem('user');
    setUser(null);
    history.push('/login');
  };

  // Return the user object and auth methods
  return {
    user,
    login,
    logout,
    register,
  };
}
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
// eslint-disable-next-line react/prop-types
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
