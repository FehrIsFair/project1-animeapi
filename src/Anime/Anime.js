import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button, Card, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import GenreList from "./GenreList/GenreList";
import OtherInfo from "./OtherInfo/OtherInfo";
import { Authentication } from "../Authentication/Authentication";
//import Related from "./related";

/* The related.js component ended up being handled different based on the
      anime called. Like, Alternate version could be alternate scenario in
      another. So I wasn't sure how to handle that info as it also wasn't an
      array, making it hard to even itterate through. */

const Anime = () => {
  const [anime, setAnime] = useState();
  const authContext = useContext(Authentication);

  const addFavorite = () => {
    authContext.addFavorite(anime);
  };

  useEffect(() => {
    const jikanApi = axios.create({
      baseURL: "https://api.jikan.moe/v3/",
    });
    async function getAnime(newCall) {
      const { data } = await jikanApi.get(`anime/${newCall}`);
      console.log(data);
      setAnime(data);
    }
    getAnime(authContext.clicked);
  }, [setAnime, authContext.clicked]);

  if (!authContext.isAuth) {
    return <Redirect to="/" />;
  }

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <Card id="container">
      <Typography id="animeTitle" variant="h3">
        {anime?.title}
      </Typography>
      <Card id="score">
        <Typography>
          <span className="bold">Rating:</span> {anime?.score}/10
        </Typography>
        {authContext.searchList(anime?.mal_id) ? (
          <Button
            variant="contained"
            onClick={() => authContext.removeFavorite(anime?.mal_id)}
          >
            Remove
          </Button>
        ) : (
          <Button variant="contained" onClick={() => addFavorite(anime, false)}>
            Add
          </Button>
        )}
      </Card>
      <Card id="synopsis">
        <img
          src={anime?.image_url}
          alt={`${anime?.title} Promotional Art`}
          style={{
            width: "225px !important",
            height: "346px",
          }}
        />
        <Card id="synText">
          <Typography>Synopsis:</Typography>
          <Typography>{anime?.synopsis}</Typography>
        </Card>
      </Card>

      <GenreList genres={anime?.genres} />
      <OtherInfo
        title_synonyms={anime?.title_synonyms}
        genres={anime?.genres}
        related={anime?.related}
      />
    </Card>
  );
};

export default Anime;
