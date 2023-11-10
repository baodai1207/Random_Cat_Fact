import './App.css'
import { useState, useEffect } from 'react';

function CatFacts() {
  const [fact, setFact] = useState(''); 
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    getFact();
  }, []);

  const getFact = async () => {
    const response = await fetch('https://meowfacts.herokuapp.com/');
    const data = await response.json();
    console.log(data.data)
    setFact(data.data);
    setFacts(prevFacts => [...prevFacts, data.data]);
  }

  const handleClick = () => {
    getFact();
  }

  const resetFacts = () => {
    setFacts([]);
  }

  return (
    <div>
      <h1>Random Cat Fact</h1>
      <p>{fact}</p>

      <button onClick={handleClick}>Get New Fact</button>

      <h2>Fact History</h2>
      <ul>
        {facts.map(fact => <li key={fact}>{fact}</li>)}
      </ul>

      <button onClick={resetFacts}>Reset Facts</button>
    </div>
  );
}

export default CatFacts;