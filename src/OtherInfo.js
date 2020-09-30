import React from "react";
import "./anime.css";
import { Card, Typography, List, ListItem } from "@material-ui/core";

const OtherInfo = (props) => {
  let aliases = props.anime.title_synonyms;
  return (
    <Card>
      {props.anime.title_synonyms.length !== 0 ? (
        <Card id="other-titles">
          <Typography variant="h4">Other Titles:</Typography>
          <List className="liststyle">
            {aliases.map((aliases, index) => {
              return <ListItem>{props.anime.title_synonyms[index]}</ListItem>;
            })}
          </List>
        </Card>
      ) : null}
      <Card id="source" styles="">
        <Typography variant="h4">Based on:</Typography>
        <Typography className="adatation">
          <a href={props.anime.related.Adaptation[0].url}>
            {props.anime.related.Adaptation[0].name}
          </a>
        </Typography>
      </Card>
    </Card>
  );
};
export default OtherInfo;
