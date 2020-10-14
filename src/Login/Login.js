import React, { useEffect, useState, useContext } from "react";
import { Card, TextField, Button } from "@material-ui/core";
import { Authentication } from "../Authentication/Authentication";

const Login = () => {
  //   const authContext = useContext(Authentication);
  //   const [loginInfo, setLoginInfo] = useState();
  //   useEffect({
  //     defaultState() {
  //       setLoginInfo({
  //         UserName: "",
  //         password: "",
  //         loggedIn: authContext.login(),
  //       });
  //     },
  //   });
  return (
    <Card id="login">
      <form id="login-form" noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          className="textfield"
          label="UserName"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          className="textfield"
          label="Password"
          variant="outlined"
        />
        <Button>Login</Button>
      </form>
    </Card>
  );
};
export default Login;
