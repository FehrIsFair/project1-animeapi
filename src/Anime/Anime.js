import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Card } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Transition from "react-transition-group/Transition";

import GenreList from "./GenreList/GenreList";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import OtherInfo from "./OtherInfo/OtherInfo";
import { Authentication } from "../Authentication/Authentication";

// Transistion States
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

const Anime = () => {
  // Hooks needed in order for the view to function.
  const [anime, setAnime] = useState();
  const [compLoad, setCompLoad] = useState(false);
  const authContext = useContext(Authentication);

  // Logic for setting up the view for the view
  useEffect(() => {
    if (!compLoad && anime) {
      setCompLoad(true);
    }
    const jikanApi = axios.create({
      baseURL: "https://api.jikan.moe/v3/",
    });
    async function getAnime(newCall) {
      const { data } = await jikanApi.get(`anime/${newCall}`);
      console.log(data);
      setAnime(data);
    }
    getAnime(authContext.clicked);
  }, [setAnime, authContext.clicked, compLoad, anime]);

  // Route Gaurding
  if (!authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  // Ensuring the view is populated while the anime is being called on.
  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <Transition in={compLoad} timeout={1000} mountOnEnter unmountOnExit>
      {(state) => (
        <Card
          id="container"
          style={
            ({
              transition: "opacity 1s ease-out",
            },
            transitionStyles[state])
          }
        >
          <GeneralInfo anime={anime} searchResult={false} styles={null} />
          {/* These components are mainly static and don't have any special function
          They only take the props given and map them out. In some cases only if they have something to map out.
    */}
          <GenreList genres={anime?.genres} />
          <OtherInfo
            title_synonyms={anime?.title_synonyms}
            genres={anime?.genres}
            related={anime?.related}
          />
        </Card>
      )}
    </Transition>
  );
};

export default Anime;
