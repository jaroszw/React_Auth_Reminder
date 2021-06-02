import { createContext, useState } from 'react';

const AuthContext = createContext({
  token: '',
  isLoaggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logOutHandler = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    logIn: logInHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
