import React from 'react';
import { AudiosContext } from './../contexts/AudiosContext';
import './Playlist.css';

function Playlist() {
    const { audios, setPlayingTrack, playingTrackIndex, setPlayingTrackIndex, hidePlaylist } = React.useContext(AudiosContext);

    const playTrack = (event, index) => {
        event.preventDefault();
        setPlayingTrackIndex(index);
        setPlayingTrack(audios[index].url);
    };

    React.useEffect(() => {
        if (playingTrackIndex != null) {
            console.log(playingTrackIndex);
            const chosen = audios[playingTrackIndex];
            console.log(audios);
            setPlayingTrack(chosen.url);
        }        
    }, [playingTrackIndex]);

    return (
        <div className={`playlist w-64 pl-2 ${hidePlaylist ? "hidden" : ""} bg-transparent opacity-75`}>
            {
                audios.map((v, i) => {
                    return (
                        <div key={i} className="track p-1">
                            <a 
                                onClick={(e) => playTrack(e, i)} 
                                className={`text-white text-xs ${playingTrackIndex == i ? "text-yellow-600" : "text-white"}`} 
                                href={v.url}
                            >
                                {`${v.title} - ${v.artist}`}
                            </a>
                        </div>
                    );
                })
            }
        </div>
    );
}


export default Playlist;