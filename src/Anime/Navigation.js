import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "@material-ui/core";

import FailedRender from "../Errors/FailedRender/FailedRender";
import { Authentication } from "../Authentication/Authentication";

const Navigation = () => {
  const authContext = useContext(Authentication);

  useEffect(() => {}, [authContext.logout]);

  if (authContext.isAuthenticated === false)
    return (
      <Card className="loggedOut">
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
    );
  if (authContext.isAuthenticated === true)
    return (
      <Card className="loggedIn">
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
    );
  return <FailedRender />;
};
export default Navigation;
