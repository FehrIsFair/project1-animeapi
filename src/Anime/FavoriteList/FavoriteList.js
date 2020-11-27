import React, { useState, useContext, useEffect } from "react";
import { Card, Typography, Button, Link } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";

import { Authentication } from "../../Authentication/Authentication";

const transitionStyles = {
  entering: {
    opacity: 0.5,
  },
  entered: {
    opacity: 1,
  },
  exiting: {
    opacity: 0.5,
  },
  exited: {
    opacity: 0,
  },
};

const FavoriteList = () => {
  const AuthContext = useContext(Authentication);
  const [fullList, setFullList] = useState();
  const [listChange, setListChange] = useState(true);
  const [showList, setShowList] = useState(true);
  const history = useHistory();

  const listChangeTracker = (mal_id) => {
    setShowList(false);
    AuthContext.removeFavorite(mal_id);
    setListChange(true);
    setShowList(true);
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
        <Typography>
          You don't have any favorites saved. Click the Add button to add. If
          you want to remove it, hit the remove button.
        </Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Typography variant="h4">Favorite List</Typography>
      {fullList.map((item) => {
        return (
          <Transition in={showList} timeout={1000} mountOnEnter unmountOnExit>
            {(state) => (
              <Card
                className="favorite"
                style={
                  ({
                    transition: "opacity 1s ease-in",
                  },
                  transitionStyles[state])
                }
              >
                <img
                  src={item.image_url}
                  alt={`${item.title} Promotional Art`}
                  style={{
                    width: "225px !important",
                    height: "346px",
                  }}
                  className="resultImage"
                />
                <div classNames="titleScore">
                  <Link onClick={() => redirectToAnimePage(item.mal_id)}>
                    <Typography variant="h4">{item.title}</Typography>
                  </Link>
                  <div className="favScore">
                    <Typography variant="h5">{item.score}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => listChangeTracker(item.mal_id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="favSyn">
                  <Card>
                    <Typography variant="p" className="">
                      {item.synopsis}
                    </Typography>
                  </Card>
                </div>
              </Card>
            )}
          </Transition>
        );
      })}
    </Card>
  );
};
export default FavoriteList;
