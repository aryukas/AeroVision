# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import joblib
from utils import extract_features, allowed_file
from config import UPLOAD_FOLDER, MODEL_PATH

# -----------------------------
# Flask App Setup
# -----------------------------
app = Flask(__name__)
CORS(app)  # allow frontend (React) to access backend

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# -----------------------------
# Hardcoded Login Credentials
# -----------------------------
USERNAME = "aryan"
PASSWORD = "1234"

@app.route("/login", methods=["POST"])
def login():
    """Simple hardcoded login endpoint."""
    data = request.get_json()

    if not data or "username" not in data or "password" not in data:
        return jsonify({"success": False, "message": "Missing username or password"}), 400

    if data["username"] == USERNAME and data["password"] == PASSWORD:
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401


# -----------------------------
# Load ML Model
# -----------------------------
try:
    model = joblib.load(MODEL_PATH)
    print("✅ Model loaded successfully from:", MODEL_PATH)
except Exception as e:
    model = None
    print("⚠️ Failed to load model:", e)


# -----------------------------
# Root Endpoint
# -----------------------------
@app.route("/")
def home():
    return jsonify({"message": "AeroVision API running 🚀"}), 200


# -----------------------------
# Prediction Endpoint
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    """Handles image upload, feature extraction, and ML prediction."""

    # Validate file existence
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400
    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    # Save uploaded image
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(path)

    # Extract features
    features = extract_features(path)
    if features is None:
        return jsonify({"error": "Feature extraction failed"}), 500

    # Ensure model is loaded
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    # Predict and return confidence
    pred = model.predict([features])[0]
    conf = model.predict_proba([features]).max()

    return jsonify({
        "filename": file.filename,
        "prediction": str(pred),
        "confidence": round(float(conf), 2)
    }), 200


# -----------------------------
# Run App
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
