import joblib
from utils import extract_features
from config import MODEL_PATH
import numpy as np

model = joblib.load(MODEL_PATH)
print("✅ Model loaded successfully!")

def predict_aircraft(image_path):
    features = extract_features(image_path)
    if features is None:
        return {"error": "Invalid image"}
    pred = model.predict([features])[0]
    conf = np.max(model.predict_proba([features]))
    return {"filename": image_path.split("\\")[-1], "prediction": str(pred), "confidence": round(float(conf), 2)}

if __name__ == "__main__":
    sample_img = "dataset/ATR/ATR - (1).jpg"
    print(predict_aircraft(sample_img))
