import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  console.log(title);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const deck = await response.json()
    setDecks([...decks, deck])
    setTitle("");
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  async function handleDeleteDeck(deckId: string) {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    });
    setDecks(decks.filter(deck => deck._id !== deckId))
  }

  return (
    <div className="App">
      <div className="decks">
        {decks.map(deck => (
          <div>
            <li key={deck._id}>{deck.title}</li>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create deck</button>
      </form>
    </div>
  );
}

export default App;
