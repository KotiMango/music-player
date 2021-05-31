//React implementation
import React from "react";
//LibarySong import
import LibarySong from "./LibarySong";

//This component holds all of the songs in a nice not too shabby corpus
//iterates over the songs and creates a new component using the data from the songs
//passed along as props to the component
const Libary = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`libary ${libraryStatus ? "active-libary" : ""}`}>
      <h2>Libary</h2>
      <div className="libary-songs">
        {songs.map((song) => (
          <LibarySong
            audioRef={audioRef}
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            key={song.id}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Libary;
