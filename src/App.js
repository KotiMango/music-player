//React implementation
import React, { useState, useRef } from "react";
//Import Styles
import "./styles/app.scss";
//Import Components
import Player from "./components/Player";
import Song from "./components/Song";
import Libary from "./components/Libary";
import Nav from "./components/Nav";
//Import Util
import chillHop from "./util";

function App() {
  //State
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  //JSX
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Libary
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
