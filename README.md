# 🌱 AgroPro Plus – Smart Agricultural Management App

AgroPro Plus is an intelligent and intuitive mobile application built to assist farmers in managing every aspect of their agricultural operations — from crop planning and budgeting to disease alerts and fertilizer scheduling. This project integrates modern tools like AI, weather APIs, and dynamic financial calculations to promote sustainable and profitable farming.

---

## 📲 Features

### 🌾 Crop Planning
- Dynamic zone-based crop selection
- Estimated expenditure by cultivation stage:
  - Land preparation
  - Seed and field establishment
  - Fertilizer application
  - Maintenance
  - Harvesting and transport

### 💰 Finance Management
- Create detailed **budget plans**
- Calculate estimated **income**, **expenditure**, and **profit**
- Visual analysis with charts and diagrams
- Generate **PDF reports** including financial summaries and graphs

### 🤖 AI-Based Fertilizer Scheduling
- Uses OpenAI API for fertilizer recommendations
- Considers crop type, area, soil data, and weather
- Generates monthly fertilizer usage and cost reports

### 📊 Market and Weather Monitoring
- Real-time weather forecasts via OpenWeather API
- Alerts for rainfall or extreme conditions
- Monitor real-time market prices for crops


### 🗺️ Location-Based Services
- Map view of farms and nearby distributors
- Mark and visualize land areas

---

## 🚀 Tech Stack

- **Frontend:** React Native (Expo), Tailwind CSS (for web styling)
- **Backend:** Node.js, Express.js, MongoDB
- **AI Integration:** OpenAI API
- **Weather API:** OpenWeather
- **PDF Generation:** `expo-print`, `expo-sharing`
- **Data Visualization:** `react-native-chart-kit`

---

## 📦 Installation

### Requirements:
- Node.js & npm
- Expo CLI (`npm install -g expo-cli`)
- MongoDB server (local or Atlas)

### Steps:

```bash
# Clone the repository
git clone https://github.com/IT22230874/Agro-pro-Plus.git
cd agropro-plus

# Install dependencies
npm install

# Start the backend (in /server folder)
cd server
npm install
npm run dev

# Start the frontend (in /client folder)
cd ../client
npm install
expo start
