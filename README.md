# Form Builder App

A full-stack web application built using **React**, **Tailwind CSS**, **Redux**, **Node.js**, and **MongoDB**, featuring a  dynamic **Form Builder** with live preview, schema generation, and response summaries.

---

## 🚀 Features

### ✅ Form Builder
- Supports Text, Email,  Checkbox, Dropdown, Date fields
- Field customization (label, placeholder, required, etc.)
- Redux Toolkit for global state
- Live JSON Schema generation
- Preview form before submission
- Auto-save form drafts (localStorage)
- Submit responses to backend
- View all responses in summary table
- Drag-and-drop form editor using `@dnd-kit`
- Shows total responses and last submitted timestamp


---

## 🧠 Tech Stack

| Frontend       | Backend         | State Mgmt | UI        | Utilities          |
|----------------|------------------|-------------|------------|---------------------|
| React (Vite)   | Node.js + Express | Redux Toolkit | Tailwind CSS | Axios, UUID, DnD Kit |


---

## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/Shivankkumar09/WorkElate_Task_day3.git
cd tasknetic

# Install frontend
cd client
npm install
npm run dev

# Install backend
cd ../server
npm install
npm run start
```

---

## 📂 Folder Structure

```
root/
├── client/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── context/ (for Task Manager)
│   └── ...
├── server/
│   ├── models/
│   ├── routes/
│   └── controllers/
```

---

## 🧪 Testing URLs

- **View Form Summary:**  
  `http://localhost:5173/summary/:formId`

- **Submit Success Page:**  
  Shown after form submission with options to view summary or go back

- **API Endpoints:**
  - `POST /api/response/add` – Submit form response
  - `GET /api/response?formId=...` – Fetch form responses

---

## 🐞 Known Issues & Challenges


### Form Builder
- State syncing between form editor and preview
- Drag-and-drop causing flicker in mobile view
- Theme toggling not applying everywhere initially
- Schema edge cases when options are missing



