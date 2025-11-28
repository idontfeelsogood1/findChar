import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './index.css'
import App from './App.jsx'

import Home from './components/Home.jsx'
import Game from './components/Game.jsx'
import Leaderboard from './components/Leaderboard.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >

        <Route index element={<Navigate to="home" replace />} />

        <Route path="home" element={<Home />} />

        <Route path="leaderboard" element={<Leaderboard />} />

        <Route path="game/:gameId" element={<Game />} />
        
      </Route>
    </Routes>
  </BrowserRouter>,
)

// BUGS:
  // GOING TO ROOT URL DOES NOT RENDER <Home />
  // populatedb.js MUST RESET INCREMENTAL ID