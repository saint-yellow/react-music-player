import React from 'react';
import Playlist from './Playlist';
import Control from './Control';
import Detail from './Detail';
import * as mmb from 'music-metadata-browser';

export default class Player extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {
            playing: false,
            index: 0,
            audios: [],
            audio: {},
            coverImage: ""
        };

        this.playerRef = React.createRef();

        this.fetchAudios('/api/audio-files');
    }

    generateCoverPicture(url) {
        fetch(url)
            .then(response => response.body)
            .then(stream => {
                mmb.parseReadableStream(stream)
                    .then(metadata => {
                        const coverPicture = metadata.common.picture[0];
                        if (coverPicture !== undefined) {
                            var base64 = "";
                            for (var i = 0; i < coverPicture.data.length; i++) {
                                base64 += String.fromCharCode(coverPicture.data[i]);
                            }
                            base64 = "data:"+coverPicture.format+";base64,"+window.btoa(base64);
                            this.setState({coverImage: base64});
                        }
                    });
            });
    }

    fetchAudios(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => { 
                this.setState({
                    audios: data.audios, 
                    audio: data.audios[this.state.index],
                }); 
                this.generateCoverPicture(data.audios[this.state.index].url);
                this.playAudio();
            });
    }

    setIndex(i) {
        this.setState({
            index: i, 
            audio: this.state.audios[i],
        });
        this.generateCoverPicture(this.state.audios[i].url);
    }

    playAudio() {
        this.playerRef.current.play();
        this.setState({playing: true});
    }

    pauseAudio() {
        this.playerRef.current.pause();
        this.setState({playing: false});
    }

    setPlaying(playing) {
        this.setState({playing: playing})
    }

    render() {
        return (
            <div className="player flex">
                <Detail audio={this.state.audio}/>

                <Control 
                    index={this.state.index}
                    playlistLength={this.state.audios.length}
                    audio={this.state.audio} 
                    playing={this.state.playing} 
                    coverImage={this.state.coverImage} 
                    setIndex={(i) => this.setIndex(i)}
                    playAudio={() => this.playAudio()}
                    pauseAudio={() =>this.pauseAudio()}
                    playerRef={this.playerRef}
                    setPlaying={(playing) =>　this.setPlaying(playing)} 
                />

                <Playlist 
                    audios={this.state.audios}
                    index={this.state.index} 
                    setIndex={(i) => this.setIndex(i)}
                    playAudio={() => this.playAudio()}
                    pauseAudio={() =>this.pauseAudio()} 
                    setPlaying={(playing) =>　this.setPlaying(playing)} 
                />
            </div>
        );
    }
}