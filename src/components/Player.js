//React implementation with state implementation
import React, { useState } from "react";
//Font_Icon Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Font_Icon Props that can be passed to the component
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  setSongs,
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setCurrentSong,
}) => {
  //Ref

  //Event Handlers

  //When skipping a song from either direction we want their status in the json file
  //To be active so, when said clicks occur the desired index is inputted to the function
  //Then it maps all over the songs in the intent of finding the coreect song file and then changing it to active
  //and everything else will be set to false
  const activeLib = (nextPrev) => {
    const newSongs = songs.map((single) => {
      if (single.id === nextPrev.id) {
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
  //Onclick event of the play button if song is
  // playing then in the event of a click it'll be paused
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  //all songs are written in html JSX in <audio/>
  //via it, I can pass all the audio data in the event
  //and pass to it onTimeUpdate, onLoadedMetadata
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };
  //Time formatter to minute format
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //The drag bar inputs data onchange then I can store live song progress
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  //Skips songs in the event onClick skip buttons
  //The buttons are classed individually. handler recives the direction
  const skipTrackHandler = (direction) => {
    //Using the the findIndex function we take the current song id and find its place
    //in the songs array, giving us the index of the song which is playing currently
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    //If the skip forward button is pressed, the current song will be set as the current index +1
    //using the remiander of the length allows us to zero the range everytime it reaches completion
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLib(songs[(currentIndex + 1) % songs.length]);
    } else {
      if (currentIndex === 0) {
        setCurrentSong(songs[songs.length - 1]);
        activeLib(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[currentIndex - 1]);
        activeLib(songs[currentIndex - 1]);
      }
    }
  };

  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={() => skipTrackHandler("skip-forward")}
      ></audio>
    </div>
  );
};

export default Player;
