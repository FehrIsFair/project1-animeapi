import React, { useContext, useState, useEffect } from "react";
import { Card, Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Authentication } from "../../Authentication/Authentication";

const Synopsis = (props) => {
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {}, [setShowAll]);
  const showMore = () => {
    setShowAll(true);
  };
  const showLess = () => {
    setShowAll(false);
  };
  const limit = 300;
  const content = props.result.synopsis;
  const toShow = content.substring(0, limit) + "...";
  if (content.length <= limit) {
    return (
      <Card id="synText">
        <Typography>Synopsis:</Typography>
        <Typography>{props.result.synopsis}</Typography>
      </Card>
    );
  }
  if (showAll) {
    return (
      <Card id="synText">
        <Typography>Synopsis:</Typography>
        <Typography>
          {props.result.synopsis}
          <Button onClick={showLess}>Read Less</Button>
        </Typography>
      </Card>
    );
  }
  return (
    <Card id="synText">
      <Typography>Synopsis:</Typography>
      <Typography>
        {toShow}
        <Button onClick={showMore}>Read Less</Button>
      </Typography>
    </Card>
  );
};

const Search = () => {
  const authContext = useContext(Authentication);
  const [results, setResults] = useState();
  const jikanApi = axios.create({
    baseURL: "https://api.jikan.moe/v3/",
  });
  async function getResults(newCall) {
    const { data } = await jikanApi.get(`search/anime?q=${newCall}`);
    setResults(data.results);
  }
  const replaceSpaces = (query) => {
    return query.replace(" ", "20%");
  };
  useEffect(() => {
    const jikanApi = axios.create({
      baseURL: "https://api.jikan.moe/v3/",
    });
    async function getResults(newCall) {
      const { data } = await jikanApi.get(`search/anime?q=${newCall}`);
      return data;
    }
    const setFirstSearch = (firstCall) => {
      setResults(getResults(replaceSpaces(firstCall)));
    };
    const replaceSpaces = (query) => {
      return query?.replace(" ", "20%");
    };
    setFirstSearch(authContext.favorite);
  }, [setResults, authContext.favorite]);
  // if (!authContext.isAuth) {
  //   return <Redirect to="/" />;
  // }
  return (
    <Card id="search">
      This is the Search Component.
      {results?.results?.map((result, index) => (
        <Card key={result?.title}>
          <Typography variant="h4">{result?.title}</Typography>
          <Card id="summary">
            <img
              src={result?.image_url}
              alt={`${result?.title} Promotional Art`}
              style={{
                width: "225px !important",
                height: "346px",
              }}
            />
            <Synopsis result={result} />
            <Card id="rating">
              <Typography>{result?.score}</Typography>
            </Card>
          </Card>
        </Card>
      ))}
    </Card>
  );
};
export default Search;
