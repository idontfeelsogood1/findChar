# 🕵️ Find The Character (Photo Tagging App)

<div align="center">

A full-stack, "Where's Waldo" style browser game featuring panoramic image search, server-side coordinate validation, and competitive global leaderboards.

[**🔴 Live Demo**](https://findchar.vercel.app/) | [**📂 Backend Repo**](https://github.com/idontfeelsogood1/findChar/tree/main/backend)

<br />

<!-- Tech Stack Badges -->
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

<br />
<br />

<!-- Screenshots in a Grid -->
<p float="left">
  <img src="https://github.com/user-attachments/assets/ee74c28b-69d5-473a-ab80-89e8852fe89c" width="45%" alt="Game Gameplay" />
  <img src="https://github.com/user-attachments/assets/3bee599d-b5d1-4013-8355-2287cd15864a" width="45%" alt="Level Selection" />
</p>

</div>

---

## 🚀 Key Features

* **🌎 4 Panoramic Levels:** Explore highly detailed maps: City Port, Rainforest, Floating Island, and Medieval Village.
* **📏 Coordinate Normalization:** Custom algorithm ensures accurate clicking regardless of screen size, zoom level, or device type.
* **🛡️ Server-Side Anti-Cheat:** All hit-detection logic resides on the server. The frontend only sends click coordinates; the backend validates them.
* **🍪 Secure Sessions:** Uses HTTP-only cookies and `express-session` to track anonymous progress without requiring user registration.
* **🏆 Global Leaderboard:** Submit your best times and compete against other players.
* **✨ Interactive UI:** Custom visual markers (using SVG) indicate hits and misses dynamically.

---

## 🧠 Technical Deep Dive

### 1. Coordinate Normalization
One of the biggest challenges in this project was handling responsive images. As the browser resizes the image, the pixel coordinates of a character change, but the database stores fixed "Hit Box" coordinates based on the **original** image resolution.

**The Solution:**
The frontend calculates a scaling ratio (`currentWidth / baseWidth`) on every click and normalizes the coordinates before sending them to the API.

### 2. Point-in-Rectangle Validation
To verify if a user found a character, the backend performs a mathematical "Point-in-Rectangle" check. This ensures that even if a user tries to manipulate frontend code, they cannot fake a "find" without guessing the exact coordinates.



```javascript
// Backend logic to determine a "hit"
const isInsideX = (clickX >= rectX) && (clickX <= rectX + rectWidth);
const isInsideY = (clickY >= rectY) && (clickY <= rectY + rectHeight);

if (isInsideX && isInsideY) {
    return { found: true };
}
```

### 3. Session-Based Game State

To lower the barrier to entry, the app does not require account creation. Instead, it creates a temporary game instance using `express-session` backed by PostgreSQL.

* **Start:** Server initializes a session timer.

* **Play:** Found characters are stored in the session `Set`.

* **Win:** The server compares the session start time vs. end time to calculate the final score, ensuring the timestamp cannot be spoofed by the client.

## 💾 Database Schema

The application uses **Prisma ORM** with **PostgreSQL**. The schema is designed to separate game metadata from game logic.

| Model | Description | 
 | ----- | ----- | 
| **Game** | Stores metadata for the 4 levels (image path, base dimensions). | 
| **Character** | Stores the secret "Hit Box" coordinates (`x`, `y`, `width`, `height`) linked to a Game. | 
| **Leaderboard** | Stores user submissions, linked to specific levels. | 
| **Session** | Stores active browser sessions (cookie-based). |
