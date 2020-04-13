import React from 'react';

export const AudiosContext = React.createContext();

function AudiosContextProvider(props) {
    const [audios, setAudios] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/audio-files")
            .then(response => response.json())
            .then(data => setAudios(data.audios));
    }, []);

    const [playingTrack, setPlayingTrack] = React.useState("");
    const [playingTrackIndex, setPlayingTrackIndex] = React.useState(null);

    const [hidePlaylist, setHidePlaylist] = React.useState(false);

    return (
        <AudiosContext.Provider value={{
            audios, 
            playingTrack, setPlayingTrack, 
            playingTrackIndex, setPlayingTrackIndex, 
            hidePlaylist, setHidePlaylist 
        }}>
            {props.children}
        </AudiosContext.Provider>
    );
}

export default AudiosContextProvider;