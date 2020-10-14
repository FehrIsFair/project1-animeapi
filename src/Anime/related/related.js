import React, { useState, useEffect } from "react";
import { List, Card, ListItem, Typography } from "@material-ui/core";
import "fontsource-roboto";

const Related = (props) => {
  const [related, setRelated] = useState();

  const setState = async () => {
    setRelated(props.related);
  };

  useEffect(() => {
    setState();
  }, [related]);

  if (!related) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card id="related">
        <Typography variant="h4">Related Stuff</Typography>
        <List>
          {related.Adaptation !== undefined ? (
            <ListItem>{related.Adaptation[0].name}</ListItem>
          ) : null}
          {related["Alternative version"] !== undefined ? (
            <ListItem>{related["Alternative version"][0].name}</ListItem>
          ) : null}
          {related["Side story"] !== undefined ? (
            <ListItem>{related["Side story"][0].name}</ListItem>
          ) : null}
          {related["Spin-off"] !== undefined ? (
            <ListItem>{related["Spin-off"][0].name}</ListItem>
          ) : null}
        </List>
      </Card>
    </>
  );
};
export default Related;
