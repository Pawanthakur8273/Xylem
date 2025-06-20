import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import EmissionsMap from './pages/EmissionsMap';
import Quiz from './pages/Quiz';
import YourGlacier from './pages/YourGlacier';
import Games from './pages/Games';
import Level1 from './pages/levels/Level1';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-glacier-50 to-glacier-100 font-open-sans">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/emissions" element={<EmissionsMap />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/glacier" element={<YourGlacier />} />
            <Route path="/Games" element={<Games />} />
            <Route path="/Level1" element={<Level1 />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;