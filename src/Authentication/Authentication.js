import React, { useState } from "react";

export const Authentication = React.createContext({
  isAuth: false,
  login: () => {},
});

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginHandler = () => {
    setIsAuthenticated(true);
  };
  return (
    <Authentication.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </Authentication.Provider>
  );
};
export default AuthProvider;
