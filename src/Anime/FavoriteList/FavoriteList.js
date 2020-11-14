import React, { useState, useContext } from "react";
import { Card, Typography } from "@material-ui/core";

import { Authentication } from "../../Authentication/Authentication";

const FavoriteList = () => {
  const AuthContext = useContext(Authentication);
  const [fullList, setFullList] = useState(AuthContext.FavoriteList);

  return (
    <Card>
      <Typography>Favorite List</Typography>
    </Card>
  );
};
export default FavoriteList;
