import React from "react";
import { Card, List, ListItem, Typography } from "@material-ui/core";

const GenreList = ({ genres }) => {
  return (
    <Card id="genre">
      <Typography variant="h4">Genres</Typography>
      <List id="genreList">
        {genres.map((genre, index) => {
          return <ListItem>{genre.name}</ListItem>;
        })}
      </List>
    </Card>
  );
};
export default GenreList;
