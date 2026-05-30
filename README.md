# 🍱 NutriScan-AI — Indian Food Recognition & Calorie Estimation

[![Model: YOLOv5 PyTorch](https://img.shields.io/badge/Model-YOLOv5%20%7C%20PyTorch-ee4c2c?style=for-the-badge&logo=pytorch)]()
[![Backend: Flask Python](https://img.shields.io/badge/Backend-Flask%20%7C%20Python-blue?style=for-the-badge&logo=flask)]()
[![Frontend: React & TS](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-61dafb?style=for-the-badge&logo=react)]()

> **"NutriScan-AI is a high-performance computer vision application designed to identify Indian food dishes from images and provide instant nutritional calorie estimations. Houses a YOLOv5 model and an interactive React web dashboard."**

---

## ⚡ The Recruiter Takeaway (Why This Matters)
1. **Custom Object Detection**: Uses a PyTorch YOLOv5 architecture mapped with regional Indian food dataset weights to detect multiple dishes in a single frame.
2. **Dynamic UI/UX**: Built with React (Vite), Framer Motion, and Tailwind CSS v4, featuring high-fidelity glassmorphic charts and calorie progress bars.
3. **Decoupled Architecture**: Fully containerized stack with modular RESTful APIs and cross-origin security rules.

---

## 🏗️ Computer Vision Pipeline

```mermaid
graph TD
    Image[User Image Upload] --> Flask[Flask REST API Backend]
    Flask --> PyTorch[PyTorch YOLOv5 Core]
    PyTorch --> Box[Bounding Box Triangulation]
    Box --> Classification[Food Class Identification]
    Classification --> Database[(Nutritional SQLite Engine)]
    Database --> Output[Calorie & Macro Estimation]
```

---

## 🛠️ Quick Launch

### 1. Requirements
* Install [Python 3.12+](https://www.python.org/) and [Node.js](https://nodejs.org/).

### 2. Startup Command
```bash
git clone https://github.com/kalyan-1845/NutriScan-AI.git
cd NutriScan-AI

# Start Vision API Server
pip install -r requirements.txt
python main.py --port 8080
```
*To launch the frontend web client, navigate to the `frontend/` directory and execute `npm run dev`.*
