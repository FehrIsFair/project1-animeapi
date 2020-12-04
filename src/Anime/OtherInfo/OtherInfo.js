import React from "react";
import "../../anime.css";
import { Card, Typography, List, ListItem } from "@material-ui/core";

// This literally just renders the other titles info and the adaptation info if ther eis info to display.
const OtherInfo = (props) => {
  return (
    <Card>
      {props.title_synonyms.length !== 0 ? (
        <div id="other-titles">
          <Typography variant="h4">Other Titles:</Typography>
          <List className="liststyle">
            {props.title_synonyms.map((value) => {
              return <ListItem>{value}</ListItem>;
            })}
          </List>
        </div>
      ) : null}
      {!props.related?.Adaptation?.length ? null : (
        <div id="source" styles="">
          <Typography variant="h4">Based on:</Typography>
          <Typography className="adatation">
            <a href={props.related.Adaptation[0].url}>
              {props.related.Adaptation[0].name}
            </a>
          </Typography>
        </div>
      )}
    </Card>
  );
};
export default OtherInfo;
