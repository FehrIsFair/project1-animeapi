import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";

import AuthProvider from "./Authentication/Authentication";

firebase.initializeApp({
  apiKey: "AIzaSyBKHQtgzFIDWcCM4qpgS0Dbfhmip98YlUY",
  authDomain: "school-project-19319.firebaseapp.com",
  databaseURL: "https://school-project-19319.firebaseio.com",
  projectId: "school-project-19319",
  storageBucket: "school-project-19319.appspot.com",
  messagingSenderId: "848680310282",
  appId: "1:848680310282:web:d2462a5494eb11e9a571f3",
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
