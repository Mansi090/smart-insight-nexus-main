# 🏢 Smart Insight Nexus  
**IoT Sensor Data RAG for Smart Buildings**  
_MERN + AI/ML powered predictive maintenance & operational optimization system_

---

## 📌 Overview
Smart Insight Nexus is a **full-stack MERN application** integrated with **AI/ML** to help building managers monitor, analyze, and optimize smart building operations.  
It connects to **IoT sensors**, reads **maintenance manuals & building specifications**, and uses **Retrieval-Augmented Generation (RAG)** + **predictive analytics** to provide:
- Real-time sensor monitoring
- Anomaly detection & alerts
- Predictive maintenance insights
- Energy efficiency recommendations

Think of it as a **ChatGPT for your building** — but with live data from sensors and the ability to predict problems before they happen.

---

## 🚀 Features
### 🔴 Real-Time IoT Data
- Streams live temperature, humidity, vibration, and energy usage data.
- WebSocket-based updates to the dashboard.

### 📚 RAG Chat Assistant
- Upload maintenance manuals & building specifications.
- AI retrieves relevant document chunks to answer user queries.
- Context-aware responses combining **documents + real-time sensor data**.

### 🛠 Predictive Maintenance
- Uses AI/ML models (LSTM/RandomForest) to forecast equipment failures.
- Displays **risk levels** and sends alerts.

### ⚡ Operational Optimization
- AI suggests energy-saving and performance-improving actions.
- Examples: HVAC optimization, preventive inspections, lighting adjustments.

### 🔔 Alerts System
- Detects anomalies in sensor readings.
- Real-time notifications in the dashboard.

---

## 🖥 Tech Stack
**Frontend:**
- React + TailwindCSS
- Chart.js / Recharts for data visualization
- WebSocket for live updates

**Backend:**
- Node.js + Express.js
- MongoDB (Atlas) for sensor & document storage
- Pinecone / Chroma for vector search
- WebSocket server for real-time data push

**AI/ML Service (Python):**
- OpenAI / HuggingFace embeddings
- Scikit-learn for anomaly detection
- LSTM/Prophet for predictive maintenance
- REST API for integration with Node backend

**Deployment:**
- Frontend → Vercel
- Backend → Render / Railway
- Database → MongoDB Atlas

---
