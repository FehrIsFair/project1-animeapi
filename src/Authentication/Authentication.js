import React, { useState, createContext } from "react";
import axios from "axios";

export const Authentication = createContext({
  isAuth: false,
  userName: "",
  password: "",
  favorite: "",
  clickedAnime: "",
  favoriteList: {},
  login: () => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [favorite, setFavorite] = useState();
  const [clicked, setClicked] = useState();
  const [list, setList] = useState();
  const jikanApi = axios.create({
    baseURL: "https://api.jikan.moe/v3/",
  });

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
    setList({});
  };
  const favoriteListBuilder = async (click) => {
    const { data } = await jikanApi.get(`anime/${click}`);
    if (list === null) {
      setList(data);
    } else {
      setList([...list, data]);
    }
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
        addFavorite: favoriteListBuilder,
        userName: username,
        password: password,
        favorite: favorite,
        clicked: clicked,
        favoriteList: list,
      }}
    >
      {props.children}
    </Authentication.Provider>
  );
};
export default AuthProvider;
