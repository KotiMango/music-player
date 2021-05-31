//React implementation
import React from "react";

//This component displays the song and all the acompanied data.

const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name}></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
