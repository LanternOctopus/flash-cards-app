import React from 'react';
import Deck from './components/Deck.tsx'
const App: React.FC = () => {
  
  return (
    <div className="App">
      <Deck 
        category='consonants'
      />
    </div>
  );
};

export default App;
