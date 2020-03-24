from flask import Flask
from backend.api import api as api_bp
from .config import Config


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    app.register_blueprint(api_bp)

    return app
