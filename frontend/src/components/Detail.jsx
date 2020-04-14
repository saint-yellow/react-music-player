import React from 'react';

export default class Detail extends React.Component {

    render() {
        return (
            <div className="detail w-64 pr-2 bg-transparent opacity-75">
                <div className="p-2 text-white">标题: {this.props.audio.title}</div>
                <div className="p-2 text-white">专辑: {this.props.audio.album}</div>
                <div className="p-2 text-white">艺人: {this.props.audio.artist}</div>
                <div className="p-2 text-white">年份: {this.props.audio.year}</div>
                <div className="p-2 text-white">流派: {this.props.audio.genre}</div>
            </div>
        );
    }
    
}