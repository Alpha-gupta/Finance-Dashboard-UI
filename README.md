# 💰 Finance Dashboard UI

A clean and responsive **Finance Dashboard** built to help users track income, expenses, and understand their financial activity in a simple and intuitive way.

This project focuses on **UI/UX design, component structure, and state management**, using mock data without any backend dependency.

---

## 🚀 Tech Stack

* **React (JSX)**
* **Vite**
* **Tailwind CSS**
* **Zustand** (state management)
* **Recharts** (data visualization)
* **Local Storage** (basic persistence)

---

## 🔥 Core Features

### 📊 Dashboard Overview

* Summary cards:

  * Current Balance
  * Total Income
  * Total Expenses
  * Savings Rate

* Charts:

  * 📈 Line chart (monthly income vs expenses)
  * 🥧 Pie chart (category-wise spending)

---

### 🧾 Transactions Management

* View all transactions in a clean table
* Search and filter transactions
* Sort by date and amount
* Empty state handling for better UX
* ✏️ Edit transactions (inline)
* ➕ Add transactions (Admin only)

---

### 👤 Role-Based UI

* Switch between:

  * **Viewer** → Read-only access
  * **Admin** → Can add/edit transactions
* Simulated frontend RBAC (no backend)

---

### 💡 Insights Panel

* Highest spending category
* Monthly comparison
* Largest transaction highlight

---

### 💾 Persistence

* Data stored in **localStorage**
* Saves:

  * Transactions
  * Role
  * Filters
  * Sorting state

---

### 🎨 UI Highlights

* Clean **card-based design**
* Responsive layout (works across devices)
* Subtle visual effects (particles background)
* Smooth and intuitive interactions

---

## 📁 Project Structure

```bash
src/
│── components/
│   ├── Charts.jsx
│   ├── DashboardCards.jsx
│   ├── Insights.jsx
│   ├── ParticlesBackground.jsx
│   ├── RoleSwitcher.jsx
│   ├── TransactionsTable.jsx
│
│── pages/
│   └── Dashboard.jsx
│
│── store/
│   └── useStore.js
│
│── data/
│   └── mockData.js
│
│── utils/
│
│── App.jsx
│── main.jsx
│── index.css
```

---

## ⚙️ Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run development server

```bash
npm run dev
```

👉 Open in browser:
`http://localhost:5173`

---

### 3️⃣ Build for production

```bash
npm run build
```

### 4️⃣ Preview production build

```bash
npm run preview
```

---

## 💡 Approach

The project is designed with a focus on:

* Clean and modular component structure
* Efficient state management using Zustand
* Simple yet effective UI/UX decisions
* Real-time updates without backend dependency

---

## ✨ Additional Highlights

* Inline editing functionality
* Form validation for better user experience
* Role-based interaction simulation
* Organized and scalable folder structure

---

## 📌 Notes

* Uses **mock data only** (no backend API)
* Designed to demonstrate frontend development skills
* Data persists locally using browser storage

---

## 🙌 Author

**Prashant Gupta**
B.Tech CSE | MANIT Bhopal

---

## ⭐ Support

If you liked this project, consider giving it a ⭐ on GitHub!
