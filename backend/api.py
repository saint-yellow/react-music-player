from flask import Flask, send_from_directory, url_for
from flask_cors import CORS
import os.path


api = Flask(__name__)
CORS(api)

API_ROOT_APTH = os.path.dirname(os.path.abspath(__file__))


@api.route("/")
def index():
    return "Saint-Yellow"


@api.route("/api/audio-file/<path:filename>")
def audio(filename):
    return send_from_directory(API_ROOT_APTH, filename)


@api.route("/api/audio-files")
def audios():
    result = url_for("audio", filename="audios/audio1.mp3")
    return {
        "audios": [result]
    }
