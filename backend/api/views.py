import os
import eyed3

from flask import Flask, send_from_directory, url_for, current_app
from . import api


@api.route("/audio-file/<path:filename>")
def audio(filename):
    audio_folder = current_app.config['AUDIO_FOLDER_PATH']
    return send_from_directory(audio_folder, filename)


@api.route("/audio-files")
def audios():
    audio_folder = current_app.config['AUDIO_FOLDER_PATH']
    audio_files = [
        {
            "url": url_for('api.audio', filename=f), 
            "file": eyed3.load(os.path.join(audio_folder, f)) 
        } for f in os.listdir(audio_folder)
    ]
    return {
        "audios": [
            {
                "url": f["url"],
                "artist": f["file"].tag.artist,
                "title": f["file"].tag.title,
                "album": f["file"].tag.album,
                "year": f["file"].tag.getBestDate().year,
                "genre": f["file"].tag.genre.name

            } for f in audio_files
        ]
    }
