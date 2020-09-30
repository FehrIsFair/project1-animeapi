import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Typography } from "@material-ui/core";
import GenreList from "./GenreList";
import OtherInfo from "./OtherInfo";
//import Related from "./related";

/* The related.js component ended up being handled different based on the
      anime called. Like, Alternate version could be alternate scenario in
      another. So I wasn't sure how to handle that info as it also wasn't an
      array, making it hard to even itterate through. */

function Anime() {
  return <AnimeComp call={5114} />;
}

const AnimeComp = ({ call }) => {
  const [anime, setAnime] = useState();

  const jikanApi = axios.create({
    baseURL: "https://api.jikan.moe/v3/",
  });

  async function getAnime(newCall) {
    const { data } = await jikanApi.get(`anime/${newCall}`);
    return data;
  }

  const determineState = async (name) => {
    switch (name) {
      case "fmab":
        setAnime(await getAnime(5114));
        break;
      case "stein":
        setAnime(await getAnime(9253));
        console.log(anime);
        break;
      case "trainwreck":
        setAnime(await getAnime(34280));
        break;
      case "silentvoice":
        setAnime(await getAnime(28851));
        break;
      default:
        setAnime(await getAnime(5114));
        break;
    }
  };

  useEffect(() => {
    determineState();
  }, [setAnime, call]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <Card id="container">
      <Button onClick={() => determineState("fmab")}>FMAB</Button>
      <Button onClick={() => determineState("stein")}>Stein's;Gate</Button>
      <Button onClick={() => determineState("trainwreck")}>Gamers!</Button>
      <Button onClick={() => determineState("silentvoice")}>
        Koe no Katachi
      </Button>
      <Typography id="animeTitle" variant="h3">
        {anime?.title}
      </Typography>
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
      <OtherInfo anime={anime} />
    </Card>
  );
};

export default Anime;
