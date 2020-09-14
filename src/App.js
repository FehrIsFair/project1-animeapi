import React from 'react';
import './reset.css';
import Anime from'./Anime';
import OtherInfo from './OtherInfo';
import './anime.css';

function App() {
  const props = {
    otherShow: false,
    sourceShow: false
  }
  return (
    <div className="App">
      <div className="titleContainer">
        <h1 className="title">My Anime API app thing</h1>
      </div>
      <Anime />
      <OtherInfo props={props} />
    </div>
  );
}

export default App;
