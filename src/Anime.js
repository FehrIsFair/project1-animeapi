import React, { Component } from 'react';
import GenreList from './GenreList'
import FMABInfo from './data/FMAB.json'
import './anime.css'

const FMAB = FMABInfo;
const genre = FMAB.genres;
const relatedItems = FMAB.related;
const relatedItemsNames = [
  relatedItems.Adaptation.name,
  relatedItems["Alternative version"][0].name,
  relatedItems["Side story"][0].name,
  relatedItems["Side story"][1].name,
  relatedItems["Spin-off"][0].name
];

class Anime extends Component {
  state = {
    genres: [
      genre[0].name,
      genre[1].name,
      genre[2].name,
      genre[3].name,
      genre[4].name,
      genre[5].name,
      genre[6].name,
      genre[7].name
    ],
    genreShow: true,
    relatedShow: true
  }
  render() {
    return (
      <div>
        <h1>{FMAB.title}</h1>
        <div className="flex">
          <img src={FMAB.image_url} alt="Fullmetal Alchemist: Brotherhood promotional art" />
          <div>
            <h3>
              Synopsis:
            </h3>
            <p className="synopsis">
              {FMAB.synopsis}
            </p>
          </div>
        </div>
        <div className="DERP">
        <h2>Genres</h2>
        <GenreList genre={this.state.genres} />
        </div>
        <h2>Related Section</h2>
        <ul className="liststyle">
          {
            relatedItemsNames.map((name, index) => {
              return <li>{name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
export default Anime;