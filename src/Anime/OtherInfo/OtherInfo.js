import React from "react";
import "../../anime.css";
import { Card, Typography, List, ListItem, Link } from "@material-ui/core";

// This literally just renders the other titles info and the adaptation info if ther eis info to display.
const OtherInfo = (props) => {
  const space = " ";
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
          <Typography variant="p">
            Based on:
            {
              space /*this wouldn't let me put a space here manually so I had to do some trickery*/
            }
            <Link className="link" href={props.related.Adaptation[0].url}>
              {props.related.Adaptation[0].name}
            </Link>
          </Typography>
        </div>
      )}
    </Card>
  );
};
export default OtherInfo;
