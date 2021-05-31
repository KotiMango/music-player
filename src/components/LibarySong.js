//Setting up react
import React from "react";
//Passing props
const LibarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = () => {
    //Beacuse it is an iterated component song is the clicked one
    setCurrentSong(song);
    //Add Active State
    const newSongs = songs.map((single) => {
      if (single.id === song.id) {
        return {
          ...single,
          active: true,
        };
      } else {
        return {
          ...single,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    //Check if the song is playing
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      //Tries to run playPromise can run the if statement only when playPromise outputs
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  };
  //The libary is made out of blocks when a block is clicked the songSelectHandler is invoked
  return (
    <div
      onClick={songSelectHandler}
      className={`libary-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibarySong;
