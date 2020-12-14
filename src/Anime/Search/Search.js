import React, { useContext, useState, useEffect } from "react";
import { Card, Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Transition from "react-transition-group/Transition";
import { FiSearch } from "react-icons/fi";
import LazyLoad from "react-lazyload";

import { Authentication } from "../../Authentication/Authentication";
import GeneralInfo from "../GeneralInfo/GeneralInfo";

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
  const [compLoad, setCompLoad] = useState(false);

  // JikanAPI reference.
  const jikanApi = axios.create({
    baseURL: "https://api.jikan.moe/v3/",
  });

  // This is sthe search function. This is how the view gets its results.
  async function getResults(newCall) {
    // This is configured to ensure the correct anime at least pop up correctly with the mature content filter on.
    // Otherwise titles like Black Clover and My Hero Academia won't ever show up.
    const { data } = await jikanApi.get(
      `search/anime?q=${newCall}&limit=15&genre=12&genre_exclude=0&order_by=members&sort=desc`
    );
    setSearchResults(data.results);
  }

  // The logic needed to re render upon a new search and use the favorite attribute of the context that I might remove (inb4 I forget to remove this comment)
  useEffect(() => {
    const jikanApi = axios.create({
      baseURL: "https://api.jikan.moe/v3/",
    });
    async function getResults(newCall) {
      const { data } = await jikanApi.get(
        `search/anime?q=${newCall}&limit=15&genre=12&genre_exclude=0&order_by=members&sort=desc`
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

  useEffect(() => {
    if (!compLoad && searchResults) {
      setCompLoad(true);
    }
  }, [compLoad, searchResults]);

  // Route Gauarding
  if (!authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  // conditional rendering to keep the view populated between searches.
  if (!searchResults) {
    return <div>Loading...</div>;
  }

  return (
    <Transition in={compLoad} timeout={1000} mountOnEnter unmountOnExit>
      {(state) => (
        <Card
          id="search"
          style={
            ({
              transition: "opacity 1s ease-out",
            },
            transitionStyles[state])
          }
        >
          <Card id="searchFunction">
            {/* This is a similar setup to login and signup. But only tracks one value. Has a similar issue with validation warnings though */}
            <Formik
              initialValues={{
                searchTerm: "",
              }}
              validationSchema={Yup.object().shape({
                searchTerm: Yup.string().required(
                  "You must enter a search term."
                ),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
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
                    className="textfield searchInput"
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
                    className="searchButton"
                  >
                    <FiSearch />
                  </Button>
                </form>
              )}
            </Formik>
          </Card>
          {searchResults?.map((result) => (
            // This renders the results and gives them an animation that gives the impression that they are loading in.
            <>
              <LazyLoad offset={100}>
                <GeneralInfo anime={result} searchResult={true} />
              </LazyLoad>
            </>
          ))}
        </Card>
      )}
    </Transition>
  );
};
export default Search;
