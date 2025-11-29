// App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AllActivities from './components/AllActivities';
import FlashCards from './components/FlashCards';
import Typing from './components/Typing';
import PartsOfSpeech from './components/PartsOfSpeech';
import Conversations from './components/Conversations';
import Scrambler from './components/Scrambler';
import Sequences from './components/Sequences';
import QuizGameBridge from './rpg/QuizGameBridge';
const App: React.FC = () => {
  return (
    <div>
      <nav>
        {/* <Link to="/">Home</Link> |{' '} */}
        <Link to="/allactivities">All Activities</Link> |{' '}
        <Link to="/flashcards">Flash Cards</Link> |{' '}
        <Link to="/typing">Typing</Link> |{' '}
        <Link to="/partsofspeech">Parts Of Speech</Link> |{' '}
        <Link to="/conversations">Conversations</Link> |{' '}
        <Link to="/scrambler">Scrambler</Link> |{' '}
        <Link to="/sequences">Sequences</Link> |{' '}
        <Link to="/game">Quiz Game</Link> |{' '}
        {/* 
        <Link to="/contact">Contact</Link> */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allactivities" element={<AllActivities />} />
        <Route path="/flashcards" element={<FlashCards />} />
        <Route path="/typing" element={<Typing />} />
        <Route path="/partsofspeech" element={<PartsOfSpeech />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/scrambler" element={<Scrambler />} />
        <Route path="/sequences" element={<Sequences />} />
        <Route path="/game" element={<QuizGameBridge />} />
        {/* 
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

export default App;