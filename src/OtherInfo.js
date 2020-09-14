import React, { Component } from 'react'
import FMABInfo from './data/FMAB.json'
import './anime.css';

const FMAB = FMABInfo;
const aliases = FMAB.title_synonyms;

const OtherInfo = () => {
  
  const hideElement = element => {
    if (element.styles === "") element.styles = "display: hide";
    else element.styles = "";
  };

  return (
    <div>
      <div id="other-titles" styles="">
      <h2>Other Titles:</h2>
      <ul className="liststyle">
        {
          aliases.map((alias, index) => {
            return <li>{aliases[index]}</li>
          })
        }
      </ul>
    </div>
      <div id="source" styles="">
        <h2>Based on:</h2>
        <p className="adaptation">
          <a href={FMAB.related.Adaptation[0].url}>{FMAB.related.Adaptation[0].name}</a>
        </p>
      </div>
    </div>
  )
}
export default OtherInfo