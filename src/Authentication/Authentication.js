import React, { useState, createContext } from "react";

export const Authentication = createContext({
  isAuth: false,
  userName: "",
  password: "",
  favorite: "",
  clickedAnime: "",
  login: () => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [favorite, setFavorite] = useState();
  const [clicked, setClicked] = useState();

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
    setClicked("");
  };
  const setClickedHandler = (click) => {
    setClicked(click);
  };
  return (
    <Authentication.Provider
      value={{
        login: loginHandler,
        isAuth: isAuthenticated,
        logout: logoutHandler,
        click: setClickedHandler,
        userName: username,
        password: password,
        favorite: favorite,
        clicked: clicked,
      }}
    >
      {props.children}
    </Authentication.Provider>
  );
};
export default AuthProvider;
