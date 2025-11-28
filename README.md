# Find The Character (Photo Tagging App)

A full-stack "Where's Waldo" style game where players search for hidden characters in panoramic images. The application features backend coordinate validation, session-based scoring, and a global leaderboard.

[**🔴 Live Demo**](https://findchar.vercel.app/) | [**📂 Backend Repo**](https://github.com/idontfeelsogood1/findChar/tree/main/backend)

<img width="1051" height="1216" alt="image" src="https://github.com/user-attachments/assets/ee74c28b-69d5-473a-ab80-89e8852fe89c" />
<img width="1050" height="1211" alt="image" src="https://github.com/user-attachments/assets/3bee599d-b5d1-4013-8355-2287cd15864a" />

## 🚀 Features

* **4 Unique Levels:** Search through City Port, Rainforest, Floating Island, and Medieval Village.
* **Coordinate Normalization:** Accurate clicking works on any screen size or zoom level.
* **Server-Side Validation:** Game logic and "hit" detection happen on the server to prevent cheating.
* **Session Tracking:** Anonymous user progress is tracked via secure HTTP-only cookies.
* **Global Leaderboard:** Compete with other players for the fastest time.
* **Visual Feedback:** Interactive markers show correct/incorrect guesses.

## 🛠️ Tech Stack

### Frontend
* **React:** UI and state management.
* **CSS Modules:** Scoped styling for components.
* **React Router:** Dynamic routing for game levels.

### Backend
* **Node.js & Express:** RESTful API.
* **PostgreSQL:** Relational database for storing maps, characters, and scores.
* **Prisma ORM:** Database schema management and queries.
* **Express-Session:** Managing user game sessions.
* **Jest & Supertest:** Integration testing for API endpoints.

## 🧠 Key Technical Concepts

### 1. Coordinate Normalization
The images on the frontend are responsive and resize based on the user's screen. However, the database stores "Hit Boxes" based on the **original** image resolution.
* **Frontend:** Calculates a scaling ratio (`currentWidth / baseWidth`) on every click.
* **Logic:** Converts the clicked pixel coordinate back to the "Base Resolution" before sending it to the server.

### 2. Point-in-Rectangle Validation
To verify a found character, the backend uses a mathematical "Point-in-Rectangle" check.
```javascript
const isInsideX = (clickX >= rectX) && (clickX <= rectX + rectWidth);
const isInsideY = (clickY >= rectY) && (clickY <= rectY + rectHeight);
// Returns true only if both are true
```

### 3. Session-Based Game State
The app does not require user registration. Instead, it uses `express-session` with a PostgreSQL session store (via Prisma) to create temporary game instances.
* When a game starts, a timer and `foundCharacters` set are initialized in the session.
* The **Win Condition** is checked entirely on the backend to ensure the recorded time is legitimate.

## 💾 Database Schema

The data is structured using Prisma with the following models:
* **Game:** Stores map metadata (image path, base dimensions).
* **Character:** Stores hit-box coordinates (`x`, `y`, `width`, `height`) linked to a Game.
* **Leaderboard:** Stores user submissions and completion times.
* **Session:** Stores active browser sessions.
