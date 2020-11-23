import React, { useState, useContext, useEffect } from "react";
import { Card, Typography, Button, Link } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";

import { Authentication } from "../../Authentication/Authentication";

const FavoriteList = () => {
  const AuthContext = useContext(Authentication);
  const [fullList, setFullList] = useState();
  const [listChange, setListChange] = useState(true);
  const history = useHistory();

  const listChangeTracker = (mal_id) => {
    AuthContext.removeFavorite(mal_id);
    setListChange(true);
  };

  const redirectToAnimePage = (malID) => {
    AuthContext.click(malID);
    history.push("/Anime");
  };

  useEffect(() => {
    const setListRender = async () => {
      if (listChange) {
        await setFullList(AuthContext.favoriteList);
        setListChange(false);
      }
    };
    setListRender();
  }, [listChange, AuthContext.favoriteList]);

  if (!AuthContext.isAuth) {
    return <Redirect to="/" />;
  }

  if (!fullList) {
    return (
      <Card>
        <Typography>You don't have any favorites saved.</Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Typography variant="h4">Favorite List</Typography>
      {fullList.map((item) => {
        return (
          <Card className="favorite">
            <Link onClick={() => redirectToAnimePage(item.mal_id)}>
              <Typography variant="h4">{item.title}</Typography>
            </Link>
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
