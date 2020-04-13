import React, { useState, useRef, useEffect } from "react";
import * as Icon from "react-feather";
import Progress from "./Progress";
import * as mmb from "music-metadata-browser";
import { AudiosContext } from './../contexts/AudiosContext';
import defaultCover from './../resources/default-cover.jpg';

function Player() {
    const { audios, playingTrack, playingTrackIndex, setPlayingTrackIndex, hidePlaylist, setHidePlaylist } = React.useContext(AudiosContext);
    const playerRef = useRef();
    const [duration, setDuration] = useState(0);
    const [curTime, setCurTime] = useState(0);
    const [playing, setPlaying] = useState(false);

    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");

    const updatetime = () => {
        setCurTime(() => Math.round(playerRef.current.currentTime));
        setDuration(() => Math.round(playerRef.current.duration));
    };

    const play = () => {
        playerRef.current.play();
        setPlaying(true);
        
    };

    const pause = () => {
        playerRef.current.pause();
        setPlaying(false);
    };

    const playNextTrack = () => {
        if (playingTrackIndex === audios.length-1) {
            setPlayingTrackIndex(0);
        } else {
            setPlayingTrackIndex(playingTrackIndex + 1);
        }
    };

    const playPreviousTrack = () => {
        if (playingTrackIndex === 0) {
            setPlayingTrackIndex(audios.length - 1);
        } else {
            setPlayingTrackIndex(playingTrackIndex - 1);
        }
    };

    useEffect(() => {
        playing ? play() : pause();
    }, [playing]);

    useEffect(() => {
        fetch(playingTrack)
		    .then(response => response.body)
		    .then(stream => {
			    mmb.parseReadableStream(stream)
				    .then(metadata => {
                        setArtist(metadata.common.artist);
                        setTitle(metadata.common.title);
                        const coverPicture = metadata.common.picture[0];
                        if (coverPicture !== undefined) {
                            var base64String = "";
                            for (var i = 0; i < coverPicture.data.length; i++) {
                                base64String += String.fromCharCode(coverPicture.data[i]);
                            }
                            var base64 = "data:"+coverPicture.format+";base64,"+window.btoa(base64String);
                            setCover(base64);
                        }
                    });
        });
        play();
    }, [playingTrack]);

    return (
        <div className="rounded-lg overflow-hidden">
            <img className="w-64 h-64 rounded-t-lg" src={playingTrack === "" ? defaultCover : cover} alt="" />
            <div className=" bg-gray-800 w-64 p-4 rounded-b-lg">
                <audio id="playlist" src={playingTrack} ref={playerRef} onTimeUpdate={updatetime} onEnded={playNextTrack} controls hidden>
                </audio>
                <div className="name mb-1 text-white font-thin">
                    {title}
                </div>

                <div className="name mb-4 text-xs font-bold text-gray-300 font-thin">
                    {artist}
                </div>
                <Progress cur={curTime} total={duration} />
                <div className="controllers flex justify-center">
                    <Icon.Music 
                        className="cursor-pointer m-2" 
                        size={40} 
                        color="white" 
                    />
                    <Icon.ArrowLeftCircle 
                        className="cursor-pointer m-2" 
                        size={40} 
                        color="white" 
                        onClick={playPreviousTrack}
                    />
                    {playing ? (
                        <Icon.PauseCircle
                            className="cursor-pointer m-2"
                            size={40}
                            color="white"
                            onClick={pause}
                        />
                    ) : (
                        <Icon.PlayCircle
                            className="cursor-pointer m-2"
                            size={40}
                            color="white"
                            onClick={play}
                        />
                    )}
                    <Icon.ArrowRightCircle
                        className="cursor-pointer m-2"
                        size={40}
                        color="white"
                        onClick={playNextTrack}
                    />
                    <Icon.List 
                        className="cursor-pointer m-2" 
                        size={40} 
                        color="white" 
                        onClick={() => setHidePlaylist(!hidePlaylist)}
                    />
                </div>
            </div>
        </div>
    );
}
export default Player;
