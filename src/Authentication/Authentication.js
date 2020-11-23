import React, { useState, createContext } from "react";

// This is the context of the entire application.
// It is what allows all views to be able to load what it needs to load.
// Like Anime.js, gets the clickedAnime prop to load the anime the user requested.
// It also handles the search and favorites. As well as the authentication process.
export const Authentication = createContext({
  isAuth: false,
  userName: "",
  password: "",
  favorite: "",
  clickedAnime: "",
  favoriteList: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  searchList: () => {},
  click: () => {},
  login: () => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [favorite, setFavorite] = useState();
  const [clicked, setClicked] = useState();
  const [list, setList] = useState([]);

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
    setList([]);
  };
  const favoriteListBuilder = async (anime) => {
    setList([...list, anime]);
  };
  const favoriteListSearcher = (mal_id) => {
    let foundItem = false;
    for (let value of list) {
      if (value.mal_id === mal_id) {
        foundItem = true;
      }
    }
    return foundItem;
  };
  const favoriteListHandler = (mal_id) => {
    let newList = [];
    for (let value of list) {
      if (value.mal_id !== mal_id) {
        newList.push(value);
      }
    }
    setList(newList);
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
        removeFavorite: favoriteListHandler,
        searchList: favoriteListSearcher,
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
