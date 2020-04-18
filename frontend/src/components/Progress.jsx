import React from "react";
import './Progress.css'

class Progress extends React.Component {
    render() {
        return (
            <div className="progress-bar flex flex-col">
                <div className="flex line rounded-lg bg-gray-500 h-1">
                    <div
                        className="cool-shadow bg-red-500 h-1 rounded-lg"
                        style={{
                            width: (this.props.currentTime / this.props.duration) * 100 + "%"
                        }}></div>
                    <div className="point cursor-pointer rounded-full bg-red-400 h-1 w-1"></div>
                </div>
                <div className="time-group font-thin text-xs text-gray-600 flex justify-between">
                    <div>
                        {
                            Math.floor(this.props.currentTime / 60) < 10 ? 
                            "0" + Math.floor(this.props.currentTime / 60) : 
                            Math.floor(this.props.currentTime / 60)
                        }:
                        {
                            (this.props.currentTime % 60) < 10 ? 
                            "0" + (this.props.currentTime % 60) : 
                            (this.props.currentTime % 60)
                        }
                    </div>
                    <div>
                        {
                            Math.floor(this.props.duration / 60) < 10 ? 
                            "0" + Math.floor(this.props.duration / 60) : 
                            Math.floor(this.props.duration / 60)
                        }:
                        {
                            (this.props.duration % 60) < 10 ? 
                            "0" + (this.props.duration % 60) : 
                            (this.props.duration % 60)
                        }
                    </div>
                </div>
            </div>
        );
    } 
}



export default Progress;
