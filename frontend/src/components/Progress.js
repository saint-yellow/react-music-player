import React from "react";
import './Progress.css'

function Progress({ cur, total }) {
    return (
        <div className="progress-bar flex flex-col">
            <div className="flex line rounded-lg bg-gray-500 h-1">
                <div
                    className="cool-shadow bg-red-500 h-1 rounded-lg"
                    style={{
                        width: (cur / total) * 100 + "%"
                    }}></div>
                <div className="point cursor-pointer rounded-full bg-red-400 h-1 w-1"></div>
            </div>
            <div className="time-group font-thin text-xs text-gray-600 flex justify-between">
                <div>{cur}s</div>
                <div>{total}s</div>
            </div>
        </div>
    );
}

export default Progress;
