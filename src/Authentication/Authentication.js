import React, { useState, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import firebase, { db } from "../lib/firebase";

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
  method: "firebaseAuth",
  signInWithGoogle: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve(),
  logout: () => Promise.resolve(),
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

  const ref = db.collection("users").doc("favorite-list");

  // This is the jikanAPI
  const jikanApi = axios.create({
    baseURL: "https://api.jikan.moe/v3/",
  });

  // Converts the list array to an object. It returns an object that's a converted array for easy storage in firebase
  const convertListArrayToObject = () => {
    let newObj = {};
    for (let value of list) {
      newObj = { ...newObj, value }; // Don't know if this is effecient or not.
    }
    return newObj;
  };

  // Saves to the firebase server by setting the new value.
  const saveToServer = () => {
    const usersRef = ref.child("users");
    usersRef.set({
      uid: {
        favoriteList: {
          ...convertListArrayToObject(),
        },
      },
    });
  };

  // This handles the now depricated
  const favoriteHandler = (_favorite) => {
    setFavorite(_favorite);
  };
  // This group handles the sign up and login functinality. Email/Password, Google Account, and hanldes crateing an account with an email and password.
  const signInWithEmailAndPassword = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };
  const createUserWithEmailAndPassword = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };
  // Just the logout function
  const logoutHandler = () => {
    return firebase.auth().signOut();
  };
  // This build the favorite list.
  const favoriteListBuilder = async (anime, searchResult) => {
    if (searchResult) {
      const { data } = await jikanApi.get(`anime/${anime.mal_id}`);
      anime = data;
    }
    setList([...list, anime]);
    saveToServer();
  };
  // Searches the list and returns a bool that determines if the add button is a remove button and vice versa.
  const favoriteListSearcher = (mal_id) => {
    let foundItem = false;
    for (let value of list) {
      if (value.mal_id === mal_id) {
        foundItem = true;
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
      admin.initializeApp();
      return unsubscribe;
    },
    [dispatch]
  );

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
