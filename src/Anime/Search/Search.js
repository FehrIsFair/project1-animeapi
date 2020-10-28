import React, { useContext, useState, useEffect } from "react";
import { Card, Button, TextField, Typography, Link } from "@material-ui/core";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { Authentication } from "../../Authentication/Authentication";
import { Formik } from "formik";
import * as Yup from "yup";

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

const Search = () => {
  const authContext = useContext(Authentication);
  const [searchResults, setSearchResults] = useState();
  const history = useHistory();
  const redirectToAnimePage = (malID) => {
    authContext.click(malID);
    history.push("/Anime");
  };
  const jikanApi = axios.create({
    baseURL: "https://api.jikan.moe/v3/",
  });
  async function getResults(newCall) {
    const { data } = await jikanApi.get(
      `search/anime?q=${newCall}&limit=15&genre=12&genre_exclude=0`
    );
    setSearchResults(data.results);
  }
  const replaceSpaces = (query) => {
    return query.replace(" ", "20%");
  };
  useEffect(() => {
    const jikanApi = axios.create({
      baseURL: "https://api.jikan.moe/v3/",
    });
    async function getResults(newCall) {
      const { data } = await jikanApi.get(
        `search/anime?q=${newCall}&limit=15&genre=12&genre_exclude=0`
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
  if (!authContext.isAuth) {
    return <Redirect to="/" />;
  }
  if (searchResults === null) {
    return <div>Loading...</div>;
  }
  return (
    <Card id="search">
      <Card id="searchFunction">
        <Formik
          initialValues={{
            searchTerm: "",
          }}
          validationSchema={Yup.object().shape({
            searchTerm: Yup.string().required("You must enter a search term."),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await getResults(replaceSpaces(values.searchTerm));
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
        <Card className="result">
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
            <Typography variant="p" className="score">
              Score: {result?.score}
            </Typography>
          </div>
          <Synopsis result={result} />
        </Card>
      ))}
    </Card>
  );
};
export default Search;
