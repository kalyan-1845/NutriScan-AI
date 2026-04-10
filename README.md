# 🍱 NutriScan-AI: Indian Food Recognition & Calorie Estimation

![NutriScan-AI Banner](https://img.shields.io/badge/Status-Production--Ready-success?style=for-the-badge&logo=pytorch)
![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)
![Tech](https://img.shields.io/badge/Backend-Python%20%7C%20Flask-blue?style=for-the-badge)
![UI](https://img.shields.io/badge/Frontend-React%20%7C%20Tailwind-61dafb?style=for-the-badge)

**NutriScan-AI** is a professional, full-stack Artificial Intelligence application designed to identify Indian food items from images and provide instant nutritional insights and calorie estimations.

## 🚀 Features

- **AI Vision Engine**: Deep Learning model (YOLOv5) optimized for Indian cuisine.
- **Instant Recognition**: Analyzes images to detect multiple food items with confidence scores.
- **Calorie Estimation**: Intelligent mapping of detected dishes to nutritional data.
- **Premium UI**: Modern glassmorphism dashboard built with React and Tailwind CSS v4.
- **Interactive UX**: Cinematic animations using Framer Motion and real-time image previews.

## 🛠️ Architecture

NutriScan-AI is built with a modern full-stack decoupled architecture:

- **Frontend**: React.js (Vite) + Tailwind CSS v4 + Axios + Framer Motion.
- **Backend**: Python 3.12 + Flask + PyTorch (YOLOv5 Engine).
- **Communication**: RESTful API with CORS support for secure cross-origin requests.

---

## 🚦 Getting Started

### 1. Prerequisites
- Python 3.12+
- Node.js & npm

### 2. Backend Setup
```bash
# Verify virtual environment
.\venv\Scripts\activate

# Install dependencies (if not already done)
pip install -r requirements.txt

# Start the server
python main.py --port 8080
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## 🧪 Technical Implementation

### Object Detection (YOLOv5)
The system leverages the YOLOv5 (You Only Look Once) architecture for real-time inference. By utilizing a pre-trained backbone and a specialized Indian food mapping layer, it achieves high precision on regional dishes.

### Communication Layer
The frontend uses **Axios** with dedicated service logic to handle image uploads via `multipart/form-data`. It includes built-in timeout handling and detailed error state management for a production-grade experience.

---

## 📜 License & Security

- **License**: This project is licensed under the [MIT License](LICENSE).
- **Security**: See [SECURITY.md](SECURITY.md) for vulnerability reporting and security policies.

---

## 👨‍💻 Developer
**kalyan-1845**

Developed with ❤️ for the Indian Food Recognition & Nutrition domain.
