#  AeroVision: aircraft Prediction System

AeroVision is a Machine Learning–based system that predicts and classifies aircraft using trained AI models.
It utilizes real-world aircraft datasets, processes them through preprocessing and feature engineering pipelines, and employs ML algorithms to provide accurate predictions.

The goal of AeroVision is to aid aerospace analysts, defense engineers, and aviation authorities in identifying aircraft efficiently using AI and automation.

---

## 🚀 Tech Stack
- Frontend: React, Tailwind CSS  
- Backend: Flask (Python)  
- Machine Learning: Numpy, pandas, CNN, Open CV 
- Tools:Jupyter Notebook, Git, Postman

Work Flow of the Project -
Data Collection:
Aircraft images, telemetry, or specification datasets (CSV, image sets, etc.)

Data Preprocessing:

Noise removal and normalization

Feature selection and encoding

Train-test split and augmentation

Model Training:
Implemented models include:

🧠 CNN / ResNet for image-based classification

🔍 Hybrid Ensemble Models for improved accuracy

Evaluation Metrics:

Accuracy

Precision, Recall, F1-score

Confusion Matrix visualization

Prediction Phase:
The Flask backend hosts the trained model, accepts uploaded data or images, and returns the aircraft type prediction.
---

## 📸 Screenshots

### 🏠 Home Page
Home Page <img width="1910" height="866" alt="Screenshot 2025-10-15 201503" src="https://github.com/user-attachments/assets/b892bf53-6067-4d0a-9137-cd2fe6e460c0" />


### 🌍 Upload Image Page
Image Upload Page<img width="1914" height="877" alt="Screenshot 2025-10-15 201532" src="https://github.com/user-attachments/assets/97fd4233-3927-48f2-9d3c-58cf74500aa2" />


### 🔥 Prediction Result
Result Page 
<img width="1917" height="871" alt="Screenshot 2025-10-15 201559" src="https://github.com/user-attachments/assets/df668431-8337-423a-8291-92926db4d038" />

---

## ⚙️ Setup Instructions

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py





