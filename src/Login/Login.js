import React, { useEffect, useState, useContext } from "react";
import { Card, TextField, Button } from "@material-ui/core";
import { Authentication } from "../Authentication/Authentication";

const Login = () => {
  let username;
  let password;
  const authContext = useContext(Authentication);
  const [loginInfo, setLoginInfo] = useState();
  const [userName, setUserName] = useState();
  const [passWord, setPassword] = useState();

  const logIn = () => {
    setLoginInfo({
      UserName: userName,
      password: passWord,
      loggedIn: authContext.login(),
    });
  };

  const getUserName = () => {
    setUserName(username);
  };

  const getPassword = () => {
    setPassword(password);
  };

  useEffect(() => {
    const defaultState = () => {
      setLoginInfo({
        UserName: "",
        password: "",
        loggedIn: false,
      });
    };
    defaultState();
  }, [setLoginInfo, authContext]);

  return (
    <Card id="login">
      <form id="login-form" noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          className="textfield"
          label="UserName"
          variant="outlined"
          onChange={(e) => getUserName(e.value)}
          value={username}
        />
        <TextField
          id="outlined-basic"
          className="textfield"
          label="Password"
          variant="outlined"
          onChange={(e) => getPassword(e.value)}
          value={password}
        />
        <Button className="button" onClick={() => logIn()}>
          Login
        </Button>
      </form>
    </Card>
  );
};
export default Login;
