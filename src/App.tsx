// App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        {/* <Link to="/">Home</Link> |{' '} */}
        <Link to="/game">Game</Link> |{' '}
        {/* 
        <Link to="/contact">Contact</Link> */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        {/* 
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

export default App;