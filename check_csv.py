# check_csv.py
import os
import pandas as pd
from config import DATASET_FOLDER

rows = []
for cls in sorted(os.listdir(DATASET_FOLDER)):
    cls_folder = os.path.join(DATASET_FOLDER, cls)
    if not os.path.isdir(cls_folder):
        continue
    for f in sorted(os.listdir(cls_folder)):
        if f.lower().endswith(('.jpg','.jpeg','.png')):
            rows.append([f"{cls}/{f}", cls])

if not rows:
    print("No images found under dataset folder:", DATASET_FOLDER)
else:
    df = pd.DataFrame(rows, columns=["filename","aircraft_type"])
    csv_path = os.path.join(DATASET_FOLDER, "metadata.csv")
    df.to_csv(csv_path, index=False)
    print("✅ metadata.csv written to:", csv_path, "with", len(df), "entries")
