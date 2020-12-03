import React from "react";
import { Card, Typography } from "@material-ui/core";

// This component is mainly for reminding people that this app was crated for educational purposes.
const Footer = () => {
  return (
    <Card className="footer">
      <Typography variant="p">
        This site was made for educational purposes only.
      </Typography>
    </Card>
  );
};
export default Footer;
