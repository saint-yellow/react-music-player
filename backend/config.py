import os

base_directory = os.path.dirname(os.path.abspath(__file__))

class Config(object):
    ROOT_PATH = base_directory
    AUDIO_FOLDER_PATH = os.path.join(base_directory, 'audios')
    AVALIABLE_AUDIO_FORMATS = ['mp3']