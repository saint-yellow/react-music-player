import React from 'react';
import * as Icon from 'react-feather';
import Progress from './Progress';

export default class Control extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
            duration: 0
        };
    }

    updateTime() {
        this.setState({
            currentTime: Math.round(this.props.playerRef.current.currentTime),
            duration: Math.round(this.props.playerRef.current.duration)
        });
    }

    render() {
        const playNextAudio = () => {
            if (this.props.index === this.props.playlistLength - 1) {
                this.props.setIndex(0);
            } else {
                this.props.setIndex(this.props.index + 1);
            }
        };

        const playPreviousAudio = () => {
            if (this.props.index === 0) {
                this.props.setIndex(this.props.playlistLength - 1);
            } else {
                this.props.setIndex(this.props.index - 1);
            }
        };


        return (
            <div className="rounded-lg overflow-hidden">
                <img className="w-64 h-64 rounded-t-lg" src={this.props.coverImage} alt="" />
                <Progress currentTime={this.state.currentTime} duration={this.state.duration} />
                <div className=" bg-gray-800 w-64 p-4 rounded-b-lg">
                    <audio 
                        id="playlist" 
                        ref={this.props.playerRef} 
                        src={this.props.audio.url} 
                        onTimeUpdate={() => this.updateTime()} 
                        onEnded={playNextAudio} 
                        controls 
                        hidden 
                        autoPlay>
                    </audio>
                    <div className="name mb-1 text-white font-thin">
                        {this.props.audio.title}
                    </div>

                    <div className="name mb-4 text-xs font-bold text-gray-300 font-thin">
                        {this.props.audio.artist}
                    </div>
                    <div className="controllers flex justify-center">
                        <Icon.ArrowLeftCircle 
                            className="cursor-pointer m-2" 
                            size={40} 
                            color="white"
                            onClick={playPreviousAudio}
                        />
                        {this.props.playing ? (
                            <Icon.PauseCircle
                                className="cursor-pointer m-2"
                                size={40}
                                color="white"
                                onClick={this.props.pauseAudio}
                            />
                        ) : (
                            <Icon.PlayCircle
                                className="cursor-pointer m-2"
                                size={40}
                                color="white"
                                onClick={this.props.playAudio}
                            />
                        )}
                        <Icon.ArrowRightCircle
                            className="cursor-pointer m-2"
                            size={40}
                            color="white"
                            onClick={playNextAudio}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
