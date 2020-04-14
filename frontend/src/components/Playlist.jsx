import React from 'react';
import './Playlist.css';

export default class Playlist extends React.Component {
    render() {
        return (
            <div className="playlist w-64 pl-2 bg-transparent opacity-75">
                {
                    this.props.audios.map((v, i) => {
                        return (
                            <div key={i} className="track p-1" onClick={(e) => {e.preventDefault(); this.props.setIndex(i);}}>
                                <a className={`title ${this.props.index === i ? "text-yellow-500" : "text-white"}`} href={v.url}>{v.title}</a>
                                <div className={`artist ${this.props.index === i ? "text-yellow-500" : "text-white"} text-xs`}>{v.artist}</div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
