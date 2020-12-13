import React, { useContext } from "react";
import { Button, Card, Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Authentication } from "../../Authentication/Authentication";

const GeneralInfo = ({ anime, searchResult, styles }) => {
  const authContext = useContext(Authentication);
  const history = useHistory();

  // this is another redirect to ensure the page is brought up with the correct data.
  const redirectToAnimePage = (malID) => {
    authContext.click(malID);
    history.push("/Anime");
  };

  return (
    <Card id="synopsis" style={styles}>
      <img
        src={anime.image_url}
        alt={`${anime.title} Promotional Art`}
        style={{
          width: "225px !important",
          height: "346px",
        }}
      />
      <div id="scoreSyn">
        <div id="titleContain">
          {searchResult ? (
            <Link onClick={() => redirectToAnimePage(anime.mal_id)}>
              <Typography id="animeTitle" variant="h4">
                {anime.title}
              </Typography>
            </Link>
          ) : (
            <Typography id="animeTitle" variant="h4">
              {anime.title}
            </Typography>
          )}
        </div>
        {authContext.searchList(anime.mal_id) ? (
          <Button
            variant="contained"
            onClick={() => authContext.removeFavorite(anime.mal_id)}
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => authContext.addFavorite(anime, searchResult)}
          >
            Add
          </Button>
        )}
        <Typography className="score">
          <span className="bold">Score:</span> {anime.score}/10
        </Typography>

        <div id="synText">
          <Typography>Synopsis:</Typography>
          <Typography>{anime.synopsis}</Typography>
        </div>
      </div>
    </Card>
  );
};
export default GeneralInfo;
