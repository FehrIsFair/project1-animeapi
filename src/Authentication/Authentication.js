import React, { useState, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import firebase from "../lib/firebase";

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  favoriteList: {},
  clickedAnime: "",
  login: () => {},
  logout: () => {},
  click: () => {},
  searchList: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATE_CHANGED": {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

// This is the context of the entire application.
// It is what allows all views to be able to load what it needs to load.
// Like Anime.js, gets the clickedAnime prop to load the anime the user requested.
// It also handles the search and favorites. As well as the authentication process.
export const Authentication = createContext({
  ...initialAuthState,
  method: "firebaseAuth",
  signInWithGoogle: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  clickedAnime: "",
  favoriteList: [],
});

const AuthProvider = ({ children }) => {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const [favorite, setFavorite] = useState();

  const [clicked, setClicked] = useState();
  const [list, setList] = useState([]);

  const jikanApi = axios.create({
    baseURL: "https://api.jikan.moe/v3/",
  });

  const signInWithEmailAndPassword = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };
  const logoutHandler = () => {
    return firebase.auth().signOut();
  };
  const favoriteListBuilder = async (anime, searchResult) => {
    if (searchResult) {
      const { data } = await jikanApi.get(`anime/${anime.mal_id}`);
      anime = data;
    }
    setList({ ...list, anime });
  };
  const favoriteListSearcher = (mal_id) => {
    let foundItem = false;
    for (let value in list) {
      if (value.mal_id === mal_id) {
        foundItem = true;
      }
    }
    return foundItem;
  };
  const favoriteListHandler = (mal_id) => {
    let newList = {};
    for (let value in list) {
      if (value.mal_id !== mal_id) {
        newList.push(value);
      }
    }
    setList(newList);
  };
  const setClickedHandler = (click) => {
    setClicked(click);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              avatar: user.photoURL,
              email: user.email,
              name: user.displayName || user.email,
              tier: "Premium",
            },
          },
        });
      } else {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Authentication.Provider
      value={{
        ...state,
        method: "FirebaseAuth",
        logout: logoutHandler,
        signInWithEmailAndPassword,
        click: setClickedHandler,
        addFavorite: favoriteListBuilder,
        removeFavorite: favoriteListHandler,
        searchList: favoriteListSearcher,
        signInWithGoogle,
        favorite: favorite,
        clicked: clicked,
        favoriteList: list,
      }}
    >
      {children}
    </Authentication.Provider>
  );
};
export default AuthProvider;
