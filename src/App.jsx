import "./App.css";
import { useState, useEffect } from "react";

function CatFacts() {
	const [fact, setFact] = useState("");
	const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false)

	useEffect(() => {
		getFact();
	}, []);

  const getFact = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://meowfacts.herokuapp.com/");
      const data = await response.json();
      setFact(data.data);
      setFacts((prevFacts) => [data.data,...prevFacts]);
    } catch (error) {
      console.error("Can't fetch from api:", error);
    }finally{
      setLoading(false)
    }
  };

	const handleClick = () => {
		getFact();
	};

	const resetFacts = () => {
		setFacts([]);
	};

	return (
		<div>
			<h1>😻Random Cat Fact😻</h1>
      <p>{loading? "Loading ..." : fact}</p>

			<button onClick={handleClick}>Get New Fact</button>

			<h2>Facts History</h2>
			<ul>
				{facts.map((fact, index) => (
					<p key={index}>
						<li>{fact}</li>
					</p>
				))}
			</ul>

			<button onClick={resetFacts}>Reset Facts</button>
		</div>
	);
}

export default CatFacts;
