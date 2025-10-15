import os
import joblib
from utils import extract_features

# -------------------------------
# CONFIGURATION
# -------------------------------
MODEL_PATH = "model/aircraft_model.pkl"
DATASET_FOLDER = "dataset"

# -------------------------------
# LOAD MODEL
# -------------------------------
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"❌ Model not found at {MODEL_PATH}")

clf = joblib.load(MODEL_PATH)
print(f"✅ Loaded model from {MODEL_PATH}\n")

# -------------------------------
# BATCH TESTING
# -------------------------------
results = []

for img_file in os.listdir(DATASET_FOLDER):
    if img_file.lower().endswith((".jpg", ".jpeg", ".png")):
        img_path = os.path.join(DATASET_FOLDER, img_file)
        try:
            features = extract_features(img_path).reshape(1, -1)
            prediction = clf.predict(features)[0]
            results.append((img_file, prediction))
        except Exception as e:
            print(f"⚠️ Skipping {img_file}: {e}")

# -------------------------------
# DISPLAY RESULTS
# -------------------------------
print("Predictions for all images in dataset:\n")
print(f"{'Filename':<20} | {'Predicted Aircraft'}")
print("-" * 50)
for filename, pred in results:
    print(f"{filename:<20} | {pred}")
