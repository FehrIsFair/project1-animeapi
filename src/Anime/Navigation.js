import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Avatar } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";

import { Authentication } from "../Authentication/Authentication";

// This is pretty short and sweet. It makes sure that it renders based on whether or not the user is logged in.
const Navigation = () => {
  // This is how it gets the authentication info.
  const authContext = useContext(Authentication);

  useEffect(() => {}, [authContext.logout]);

  if (!authContext.isAuthenticated)
    return (
      <CSSTransition
        in={authContext.isAuthenticated}
        timeout={1000}
        classNames="slide"
      >
        <Card id="loggedOut">
          <ul className="nav">
            <li>
              <Link to="/">
                <Button>Sign In</Button>
              </Link>
            </li>
            <li>
              <Link to="/SignUp">
                <Button>Sign Up</Button>
              </Link>
            </li>
          </ul>
        </Card>
      </CSSTransition>
    );
  if (authContext.isAuthenticated)
    return (
      <CSSTransition
        in={authContext.isAuthenticated}
        timeout={1000}
        classNames="slide"
      >
        <Card id="loggedIn">
          <Avatar className="avatar" src={authContext.user.photoURL} />
          <ul className="nav">
            <li>
              <Link to="/">
                <Button onClick={authContext.logout}>Log Out</Button>
              </Link>
            </li>
            <li>
              <Link to="/Search">
                <Button>Search</Button>
              </Link>
            </li>
            <li>
              <Link to="/Favorites">
                <Button>Favorites</Button>
              </Link>
            </li>
          </ul>
        </Card>
      </CSSTransition>
    );
};
export default Navigation;
