import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Anime from "./Anime/Anime";
import Login from "./Login/Login";
import Signup from "./Login/SignUp/SignUp";
import NavBar from "./Anime/Navigation";
import Search from "./Anime/Search/Search";
import FavoriteList from "./Anime/FavoriteList/FavoriteList";
import Footer from "./Anime/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/Anime" exact component={Anime} />
        <Route path="/Search" exact component={Search} />
        <Route path="/Favorites" exact component={FavoriteList} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
