# ArborX AI - Infrastructure Integrity Platform

This repository contains the source code for the ArborX AI platform, a high-fidelity monitoring system for industrial infrastructure.

## About This Project

**ArborX AI** is a state-of-the-art infrastructure monitoring and vegetation management platform. It leverages high-resolution spectral imagery and a custom-built Convolutional Neural Network (CNN) to identify anomalies in industrial corridors, ensuring regional grid integrity and preventing environmental hazards.

### Core Features
- **Neural Processing Pipeline**: Automated multi-spectral data analysis using our custom-built *ArborDetect* CNN architecture.
- **Real-Time Analytics Dashboard**: Live telemetry of model performance, training convergence, and VRAM utilization.
- **Territory Risk Heatmaps**: Interactive map tracking of structural anomalies, active crews, and vegetation encroachment across high-voltage sectors.
- **Professional Reporting**: Integrated PDF export engine for technical audits and board-level executive briefings.
- **Chatbot Integration**: Context-aware AI assistant for platform navigation and data querying.

### Technology Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4.0, Recharts, Leaflet
- **Backend**: Python, Flask, TensorFlow/Keras (Custom CNN), scikit-learn
- **AI Integration**: Custom LLM Integration

---

## 🚀 Setup & Installation Guide

This project requires running both the **React Frontend** and the **Python Flask Backend** simultaneously. Follow the step-by-step instructions below.

### 1. Setup the Python Backend (Machine Learning & API)

The backend handles image processing, anomaly detection, and serving the custom CNN model predictions.

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Create a Python Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install Required Packages**:
   This will install all necessary ML and server dependencies including Flask, TensorFlow, scikit-learn, and matplotlib.
   ```bash
   pip install -r requirements.txt
   ```

4. **(Optional) Train the CNN Model**:
   If you want to train the model from scratch on the latest datasets:
   ```bash
   python prepare_data.py
   python train.py
   ```

5. **Start the Backend Server**:
   ```bash
   python app.py
   ```
   *The server will start running on `http://127.0.0.1:5001`.*

### 2. Setup the React Frontend

The frontend provides the interactive UI, real-time analytics, and workforce dispatch mapping.

1. **Open a new terminal window** and navigate to the root directory of the project.

2. **Install Required Packages**:
   This installs all React dependencies.
   ```bash
   npm install
   ```

3. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```
   *The web application will open on your local host (usually `http://localhost:3000` or `http://localhost:5173`).*

---

## 🔐 Demo Login Credentials

You can use the built-in "Quick Select" buttons on the login page to automatically sign in, or you can manually use any of the following authorized crew accounts:

| Name | Username (Email) | Password |
| :--- | :--- | :--- |
| **Pranav M. Sangeeth** | `pranav@arborx.ai` | `admin123` |
| **R. Gangadharan** | `ganga@arborx.ai` | `admin123` |
| **K. Madhuvinesh** | `madhu@arborx.ai` | `admin123` |
| **Naveena I.** | `naveena@arborx.ai` | `admin123` |
