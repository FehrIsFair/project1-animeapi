import React, { useEffect, useContext } from "react";
import { Authentication } from "../Authentication/Authentication";
import { Link } from "react-router-dom";
import { Card, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FailedRender from "../Errors/FailedRender/FailedRender";

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
  listItem: {
    width: "25%",
  },
});

const Navigation = () => {
  const authContext = useContext(Authentication);

  useEffect(() => {}, [authContext.logout]);
  if (authContext.isAuth === false)
    return (
      <Card className="loggedOut">
        <ul className="nav">
          <li className={useStyles.listItem}>
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
  if (authContext.isAuth === true)
    return (
      <Card className="loggedIn">
        <Link to="/">
          <Button onClick={authContext.logout}>Log Out</Button>
        </Link>
        <Link to="/Search">
          <Button>Search</Button>
        </Link>
      </Card>
    );
  return <FailedRender />;
};
export default Navigation;
