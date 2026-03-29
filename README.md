# 🚀 Cubelelo Support Intelligence Dashboard

🔗 **Live Demo:** https://intelligence-dashboard-silk.vercel.app/

---

## 📌 Overview

The **Cubelelo Support Intelligence Dashboard** is a modern, AI-powered analytics tool designed to transform raw customer support ticket data into **actionable business insights**.

This project was developed as part of an **internship evaluation assignment**, focusing on:

* Real-world data processing
* AI integration (Gemini API)
* Clean frontend architecture using React
* Insightful dashboard visualization

The application enables support teams and managers to quickly identify **critical issues, operational bottlenecks, and risk factors** from weekly ticket data.

---

## ✨ Key Features

### 📊 Intelligent Analytics

* Automated **AI-driven insights generation**
* Manager-ready summary for quick decision-making
* Risk scoring system (0–100 scale)

### 📈 Data Visualization

* Issue category breakdown
* Patterns detection
* Unresolved ticket tracking
* Risk meter visualization

### ⚡ Smart Processing

* CSV parsing and validation
* Fallback to local analytics if AI fails
* Robust handling of inconsistent AI responses

### 📤 Export & Utility

* Export reports
* Copy insights
* Toast notifications for better UX

---

## 🧠 Tech Stack

| Category         | Technology         |
| ---------------- | ------------------ |
| Frontend         | React.js           |
| Styling          | CSS Modules        |
| AI Integration   | Google Gemini API  |
| State Management | Custom React Hooks |
| Deployment       | Vercel             |

---

## 🏗️ Project Architecture

```
src/
├── index.js                        # React entry point
├── index.css                       # Global styles
├── App.jsx                         # Root component
│
├── constants/                      # Static data
├── utils/                          # Pure utility functions
├── services/                       # API integration (Gemini)
├── hooks/                          # Business logic layer
└── components/
    ├── ui/                         # Reusable UI components
    ├── layout/                     # Layout components
    └── dashboard/                  # Core dashboard features
```

---

## ⚙️ Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run locally

```bash
npm start
```

App runs on:
👉 http://localhost:3000

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

⚠️ Required for AI-powered analysis

---

## 📄 CSV Input Format

```
ticket_id,date,customer,issue_category,product,status,priority,days_open,description
TK001,2025-07-01,Rahul Sharma,Delivery Delay,GAN 12 Maglev,Open,High,8,Order delayed
```

---

## 🧩 Key Architecture Decisions

| Concern          | Solution                                   |
| ---------------- | ------------------------------------------ |
| API Handling     | Centralized in `services/geminiService.js` |
| Business Logic   | Encapsulated in custom hooks               |
| UI Scalability   | Modular component structure                |
| Data Reliability | AI response normalization layer            |
| Error Handling   | Graceful fallback to local analytics       |

---

## 🚀 Deployment

Deployed on **Vercel** for fast and reliable hosting:

🔗 https://intelligence-dashboard-silk.vercel.app/

---

## 🎯 Highlights

* Built with **production-level architecture**
* Handles **real-world AI inconsistencies**
* Designed for **scalability and maintainability**
* Focused on **practical business use-case**

---

## 📌 Conclusion

This project demonstrates the ability to:

* Build scalable React applications
* Integrate AI into real-world workflows
* Design meaningful dashboards
* Handle edge cases and data inconsistencies

It reflects strong skills in **frontend engineering, problem-solving, and system design**, making it highly relevant for modern product development roles.

---

## 👨‍💻 Author

**Anurag Mishra**

---

⭐ *If you found this project interesting, feel free to explore and provide feedback!*
