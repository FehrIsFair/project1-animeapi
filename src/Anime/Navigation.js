import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

const siteNavigation = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Sign In</Link>
        </li>
        <li>
          <Link to="/SignUp">Sign Up</Link>
        </li>
        <li>
          <Link to="/Anime">Anime</Link>
        </li>
      </ul>
    </div>
  );
};
export default siteNavigation;
