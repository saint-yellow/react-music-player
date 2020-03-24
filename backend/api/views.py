import os

from flask import Flask, send_from_directory, url_for, current_app
from . import api
from ..config import base_directory


@api.route("/")
def index():
    return 'Saint-Yellow'


@api.route("/audio-file/<path:filename>")
def audio(filename):
    audio_folder = current_app.config['AUDIO_FOLDER_PATH']
    return send_from_directory(audio_folder, filename)


@api.route("/audio-files")
def audios():
    audio_folder = current_app.config['AUDIO_FOLDER_PATH']
    audio_files = [f for f in os.listdir(audio_folder)]
    return {
        "audios": [url_for('api.audio', filename=f, _external=True) for f in audio_files]
    }
