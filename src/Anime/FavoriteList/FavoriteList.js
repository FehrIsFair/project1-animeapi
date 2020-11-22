import React, { useState, useContext, useEffect } from "react";
import { Card, Typography, Button } from "@material-ui/core";

import { Authentication } from "../../Authentication/Authentication";

const FavoriteList = () => {
  const AuthContext = useContext(Authentication);
  const [fullList, setFullList] = useState(AuthContext.favoriteList);

  const listChangeTracker = (mal_id) => {
    AuthContext.removeFavorite(mal_id);
  };

  useEffect(() => {}, [fullList]);

  return (
    <Card>
      <Typography variant="h4">Favorite List</Typography>
      {fullList.map((item) => {
        return (
          <Card className="favorite">
            <Typography variant="h4">{item.title}</Typography>
            <Card className="favScore">
              <Typography variant="h5">{item.score}</Typography>
              <Button onClick={() => listChangeTracker(item.mal_id)}>
                Remove
              </Button>
            </Card>
            <div className="favSyn">
              <img
                src={item.image_url}
                alt={`${item.title} Promotional Art`}
                style={{
                  width: "225px !important",
                  height: "346px",
                }}
              />
              <Card>
                <Typography variant="p" className="">
                  {item.synopsis}
                </Typography>
              </Card>
            </div>
          </Card>
        );
      })}
    </Card>
  );
};
export default FavoriteList;
