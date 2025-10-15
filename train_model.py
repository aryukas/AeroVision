import os
import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from utils import extract_features
from config import DATASET_FOLDER, MODEL_PATH

print("🚀 Starting training process...")

csv_path = os.path.join(DATASET_FOLDER, "metadata.csv")
df = pd.read_csv(csv_path)
df.columns = df.columns.str.strip()

X, y = [], []
skipped_files = []

for _, row in df.iterrows():
    img_path = os.path.join(DATASET_FOLDER, str(row["filename"]).strip())
    feat = extract_features(img_path)
    if feat is not None:
        X.append(feat)
        y.append(row["aircraft_type"])
    else:
        skipped_files.append(img_path)

X, y = np.array(X), np.array(y)
print(f"✅ Features shape: {X.shape}, labels: {y.shape}, skipped: {len(skipped_files)}")

if len(X) == 0:
    raise ValueError("No valid images found for training!")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=250, max_depth=30, random_state=42)
clf.fit(X_train, y_train)
acc = clf.score(X_test, y_test)
print(f"✅ Trained. Test accuracy: {acc*100:.2f}%")

os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
joblib.dump(clf, MODEL_PATH)
print(f"💾 Model saved to: {MODEL_PATH}")
