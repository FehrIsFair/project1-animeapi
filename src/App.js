import React from "react";
import Anime from "./Anime/Anime";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Login/SignUp/SignUp";
import Navigation from "./Anime/Navigation";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/Anime" exact component={Anime} />
      </div>
    </BrowserRouter>
  );
}

export default App;
