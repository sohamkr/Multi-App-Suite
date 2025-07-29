# 🌤️ Multi-App Suite

A full-stack web application suite combining an Angular dashboard, a Node.js + MongoDB backend server, and a standalone weather application.

---

## 📁 Project Structure

Multi-App-Suite/
├── Angular-dashboard/ # Frontend (Angular)
├── server/ # Backend (Node.js + Express + MongoDB)
└── weather-app/ # Standalone Weather Utility


---

## 🚀 Features

### 🧩 Angular Dashboard
- User-friendly interface
- Real-time data rendering
- Integrated weather and currency tools

### 🛠 Server
- Node.js + Express backend
- Connected to MongoDB
- RESTful API endpoints for data storage, retrieval, and manipulation

### 🌦 Weather App
- Fetches real-time weather data using public APIs
- Location-based weather display
- Neat and responsive UI

---

## 🧪 Tech Stack

- **Frontend**: Angular, HTML5, CSS3, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **APIs Used**: OpenWeatherMap API (or similar)

---

## 🛠️ How to Run the Project Locally

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/sohamkr/Multi-App-Suite.git
cd Multi-App-Suite

 2. Run the Frontend (Angular-dashboard)
cd Angular-dashboard
npm install
ng serve

3. Run the Backend (server)
cd ../server
npm install
node index.js

4. Create a .env file in the server/ folder with:
PORT=5000
MONGODB_URI=your_mongo_connection_string
API_KEY=your_api_key_if_applicable
