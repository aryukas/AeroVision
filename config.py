# config.py
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_FOLDER = os.path.join(BASE_DIR, "dataset")
MODEL_DIR = os.path.join(BASE_DIR, "model")
MODEL_PATH = os.path.join(MODEL_DIR, "aircraft_model.pkl")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

# Feature / image settings
IMG_SIZE = (128, 128)   # resize for pixel-based features
HIST_BINS = 32          # color histogram bins
LBP_RADIUS = 1          # LBP radius (integer)
LBP_POINTS = 8 * LBP_RADIUS

# RandomForest settings
RF_N_ESTIMATORS = 200
RF_RANDOM_STATE = 42
