import React, { useContext, useState, useEffect } from "react";
import { Card, Button, TextField, Typography, Link } from "@material-ui/core";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Transition from "react-transition-group/Transition";

import { Authentication } from "../../Authentication/Authentication";

// As a heads up, if the JSX ends up looking like its all one color, thats the ? marks.
// They do that but they don't trigger any warnings. I'm thinking it has something to do with VS Code and its code stylings.
const Synopsis = (props) => {
  // Hooks to help the component and page function.
  const [showAll, setShowAll] = useState(false);
  const limit = 300;
  const content = props.result.synopsis;
  const toShow = content.substring(0, limit) + "...";

  // This I don't think every worked. Mainly because the synopsis, upon further investigation, wasn't the full one to begin with so I wasted my time here.
  const showMore = () => {
    setShowAll(true);
  };

  const showLess = () => {
    setShowAll(false);
  };

  useEffect(() => {}, [setShowAll]);

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
        <Typography>{props.result.synopsis}</Typography>
        <Button onClick={showLess}>Read Less</Button>
      </Card>
    );
  }

  return (
    <Card id="synText">
      <Typography>Synopsis:</Typography>
      <Typography>{toShow}</Typography>
      <Button onClick={showMore}>Read Less</Button>
    </Card>
  );
};
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

// Main Component
const Search = () => {
  // Hooks for the component
  const authContext = useContext(Authentication);
  const [searchResults, setSearchResults] = useState();
  const [newSearch, setNewSearch] = useState(true);
  const history = useHistory();

  // Redirect function to take it to the anime.js page and ensures it loads the reqested anime.
  const redirectToAnimePage = (malID) => {
    authContext.click(malID);
    history.push("/Anime");
  };

  // JikanAPI reference.
  const jikanApi = axios.create({
    baseURL: "https://api.jikan.moe/v3/",
  });

  // This is sthe search function. This is how the view gets its results.
  async function getResults(newCall) {
    setNewSearch(false);
    // This is configured to ensure the correct anime at least pop up correctly with the mature content filter on.
    // Otherwise titles like Black Clover and My Hero Academia won't ever show up.
    const { data } = await jikanApi.get(
      `search/anime?q=${newCall}&limit=15&genre=12&genre_exclude=0&order_by=members&sort=desc`
    );
    setNewSearch(true);
    setSearchResults(data.results);
  }

  // The logic needed to re render upon a new search and use the favorite attribute of the context that I might remove (inb4 I forget to remove this comment)
  useEffect(() => {
    const jikanApi = axios.create({
      baseURL: "https://api.jikan.moe/v3/",
    });
    async function getResults(newCall) {
      const { data } = await jikanApi.get(
        `search/anime?q=${newCall}&genre=12&genre_exclude=0`
      );
      return data.results;
    }
    async function setFirstSearch(firstCall) {
      setSearchResults(await getResults(replaceSpaces(firstCall)));
    }
    const replaceSpaces = (query) => {
      return query?.replace(" ", "20%");
    };
    setFirstSearch(authContext.favorite);
  }, [setSearchResults, authContext.favorite]);

  // Route Gauarding
  if (!authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  // conditional rendering to keep the view populated between searches.
  if (!searchResults) {
    return <div>Loading...</div>;
  }

  return (
    <Card id="search">
      <Card id="searchFunction">
        {/* This is a similar setup to login and signup. But only tracks one value. Has a similar issue with validation warnings though */}
        <Formik
          initialValues={{
            searchTerm: "",
          }}
          validationSchema={Yup.object().shape({
            searchTerm: Yup.string().required("You must enter a search term."),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await getResults(values.searchTerm);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                name="searchTerm"
                className="textfield"
                label="Search..."
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.searchTerm && errors.searchTerm)}
                helpertext={touched.Username && errors.Username}
                value={values.searchTerm}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={errors.searchTerm}
              >
                Search
              </Button>
            </form>
          )}
        </Formik>
      </Card>
      {searchResults?.map((result) => (
        // This renders the results and gives them an animation that gives the impression that they are loading in.
        <Transition in={newSearch} timeout={1000} mountOnEnter unmountOnExit>
          {(state) => (
            <Card
              className="result"
              style={
                ({
                  transition: "opacity 1s ease-out",
                },
                transitionStyles[state])
              }
            >
              <img
                className="resultImage"
                src={result?.image_url}
                alt={`${result?.title} Promotional Art`}
              />
              <div classNames="titleScore">
                <Typography className="resultTitle" variant="h4">
                  <Link onClick={() => redirectToAnimePage(result?.mal_id)}>
                    {result?.title}
                  </Link>
                </Typography>
                {authContext.searchList(result?.mal_id) ? (
                  <Button
                    variant="contained"
                    onClick={() => authContext.removeFavorite(result?.mal_id)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => authContext.addFavorite(result, true)}
                  >
                    Add
                  </Button>
                )}
                <Typography variant="p" className="score">
                  Score: {result?.score}
                </Typography>
              </div>
              <Synopsis result={result} />
            </Card>
          )}
        </Transition>
      ))}
    </Card>
  );
};
export default Search;
