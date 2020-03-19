import React, { useState, useRef, useEffect } from "react";
import * as Icon from "react-feather";
import Progress from "./Progress";
import * as mmb from "music-metadata-browser";

function Player() {
    const audioList = [
        "http://127.0.0.1:5000/api/audio-file/audios/audio1.mp3",
        "http://127.0.0.1:5000/api/audio-file/audios/audio2.mp3",
        "http://127.0.0.1:5000/api/audio-file/audios/audio3.m4a",
    ];

    const [currentAudio, setCurrentAudio] = useState(0);

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

    useEffect(() => {
        playing ? play() : pause();
    }, [playing]);

    useEffect(() => {
        fetch(audioList[currentAudio])
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
    }, [currentAudio]);

    return (
        <div className="rounded-lg overflow-hidden">
            <img className="w-64 h-64" src={cover} alt="" />
            <div className=" bg-gray-800 w-64 p-4">
                <audio ref={playerRef} onTimeUpdate={updatetime} loop="loop">
                    <source src={audioList[currentAudio]} type="audio/mpeg"></source>
                </audio>
                <div className="name mb-1 text-white font-thin">
                    {title}
                </div>

                <div className="name mb-4 text-xs font-bold text-gray-300 font-thin">
                    {artist}
                </div>
                <Progress cur={curTime} total={duration} />
                <div className="controllers flex justify-center">
                    <Icon.ArrowLeftCircle 
                        className="cursor-pointer m-2" 
                        size={40} 
                        color="white" 
                        onClick={() => { currentAudio === 0 ? setCurrentAudio(audioList.length -1) : setCurrentAudio(currentAudio-1); }}
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
                        className="cursor-white m-2"
                        size={40}
                        color="white"
                        onClick={() => { currentAudio === audioList.length -1 ? setCurrentAudio(0) : setCurrentAudio(currentAudio+1); }}
                    />
                </div>
            </div>
        </div>
    );
}
export default Player;
