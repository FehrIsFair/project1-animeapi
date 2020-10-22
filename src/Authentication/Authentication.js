import React, { useState, createContext } from "react";

export const Authentication = createContext({
  isAuth: false,
  userName: "",
  password: "",
  login: () => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [favorite, setFavorite] = useState();
  const loginHandler = (_username, _password, _favorite) => {
    setIsAuthenticated(true);
    setUsername(_username);
    setPassword(_password);
    setFavorite(_favorite);
  };
  const logoutHandler = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setFavorite("");
  };
  return (
    <Authentication.Provider
      value={{
        login: loginHandler,
        isAuth: isAuthenticated,
        logout: logoutHandler,
        userName: username,
        password: password,
        favorite: favorite,
      }}
    >
      {props.children}
    </Authentication.Provider>
  );
};
export default AuthProvider;
