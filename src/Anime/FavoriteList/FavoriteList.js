import React, { useState, useContext } from "react";
import { Card, Typography } from "@material-ui/core";

import { Authentication } from "../../Authentication/Authentication";
import data from "../../data/FMAB.json";

const FMAB = data;

const FavoriteList = () => {
  const AuthContext = useContext(Authentication);
  const [fullList, setFullList] = useState([FMAB]);

  return (
    <Card>
      <Typography variant="h4">Favorite List</Typography>
      {fullList.map((item) => {
        return (
          <Card className="favorite">
            <Typography variant="h4">{item.title}</Typography>
            <Card className="favScore">
              <Typography variant="h5">{item.score}</Typography>
            </Card>
            <div className="favSyn">
              <img
                src={item.image_url}
                alt={`${item.title} Promotional Art`}
                style={{
                  width: "225px !important",
                  height: "346px",
                }}
              />
              <Card>
                <Typography variant="p" className="">
                  {item.synopsis}
                </Typography>
              </Card>
            </div>
          </Card>
        );
      })}
    </Card>
  );
};
export default FavoriteList;
