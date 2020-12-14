import React, { useState, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import app from "../lib/firebase";
import "firebase/firestore";

// This is just the initial state of the authentication.
const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  favoriteList: {},
  clickedAnime: "",
  login: () => {},
  logout: () => {},
  signup: () => {},
  click: () => {},
  searchList: () => {},
  addFavorite: () => {},
  loadData: () => {},
  sendData: () => {},
  removeFavorite: () => {},
};

// This reducer returns the state an objecgt based on if the user successfully authenticated.
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
  method: "appAuth",
  signInWithGoogle: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve(),
  loadAppData: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  sendAppData: () => Promise.resolve(),
  clickedAnime: "",
  favoriteList: [],
});

// This is the Provider and lets the rest of the compoments access things globally without needing to pass a prop everywhere.
const AuthProvider = ({ children }) => {
  // Here are my hooks that trigger states and keep track of things accross the app.
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const [favorite, setFavorite] = useState();
  const [clicked, setClicked] = useState();
  const [list, setList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // This is the jikanAPI
  const jikanApi = axios.create({
    baseURL: "https://api.jikan.moe/v3/",
  });

  // This handles the now depricated
  const favoriteHandler = (_favorite) => {
    setFavorite(_favorite);
  };
  // This group handles the sign up and login functinality. Email/Password, Google Account, and hanldes crateing an account with an email and password.
  const signInWithEmailAndPassword = async (email, password) => {
    return app.auth().signInWithEmailAndPassword(email, password);
  };
  const createUserWithEmailAndPassword = async (email, password) => {
    return app.auth().createUserWithEmailAndPassword(email, password);
  };
  const signInWithGoogle = () => {
    const provider = new app.auth.GoogleAuthProvider();

    return app.auth().signInWithPopup(provider);
  };
  // Just the logout function
  const logoutHandler = () => {
    return app.auth().signOut();
  };
  // This build the favorite list.
  const favoriteListBuilder = async (anime, searchResult) => {
    if (searchResult) {
      const { data } = await jikanApi.get(`anime/${anime.mal_id}`);
      anime = data;
    }
    if (list) {
      setList([...list, anime]);
    } else {
      setList([anime]);
    }
  };

  // Searches the list and returns a bool that determines if the add button is a remove button and vice versa.
  const favoriteListSearcher = (mal_id) => {
    let foundItem = false;
    if (list) {
      for (let value of list) {
        if (value.mal_id === mal_id) {
          foundItem = true;
        }
      }
    }
    return foundItem;
  };
  // This removes an anime from the list by looking for the anime of the same ID
  const favoriteListHandler = (mal_id) => {
    let newList = [];
    for (let value of list) {
      if (value.mal_id !== mal_id) {
        newList = [...newList, value];
      }
    }

    setList(newList);
  };
  // This makes sure that the clicked anime is remembered after going towards the anime page.
  const setClickedHandler = (click) => {
    setClicked(click);
  };

  // This is juse the logic used to make sure the user is authenticated between sessions and if they logout correctly sets the state so that isAuthenticated returns false.
  useEffect(
    (admin) => {
      const unsubscribe = app.auth().onAuthStateChanged((user) => {
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
    },
    [dispatch]
  );
  // This useEffect makes sure to load and save the favorite list every time a rerender is made (basically whenever the button in GeneralInfo needs to change its text)
  useEffect(() => {
    const jikanApi = axios.create({
      baseURL: "https://api.jikan.moe/v3/",
    });
    const db = app.firestore();
    const storeInapp = async () => {
      await db
        .collection("favoriteList")
        .doc("xPEEHOjwukpnkb6AFD1c")
        .set({
          list: [...convertObjArrayToNumberArray()],
        });
    };
    const convertObjArrayToNumberArray = () => {
      let newArray = [];
      for (let value of list) {
        newArray.push(value.mal_id);
      }
      return newArray;
    };
    // Makes the new favoriteList on app load
    const setupFavoriteListOnLoad = async (numberArray) => {
      let newArray = [];
      for (let value of numberArray) {
        let { data } = await jikanApi.get(`anime/${value}`);
        newArray = [...newArray, data];
      }
      setList(newArray);
    };

    // Loads the app data
    const loadAppData = async () => {
      let doc = await db
        .collection("favoriteList")
        .doc("xPEEHOjwukpnkb6AFD1c")
        .get();
      console.log(doc.data());
      let dataArray = [...doc.data().list];
      console.log(dataArray);
      setupFavoriteListOnLoad(dataArray);
      setDataLoaded(true);
    };
    if (!dataLoaded) {
      loadAppData();
    } else {
      storeInapp();
    }
  }, [list, dataLoaded]);

  return (
    <Authentication.Provider
      value={{
        ...state,
        method: "firebaseAuth",
        logout: logoutHandler,
        signInWithEmailAndPassword,
        click: setClickedHandler,
        addFavorite: favoriteListBuilder,
        removeFavorite: favoriteListHandler,
        searchList: favoriteListSearcher,
        signInWithGoogle,
        createUserWithEmailAndPassword,
        favoriteHandler: favoriteHandler,
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
