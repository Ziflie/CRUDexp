import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import reactLogo from "./assets/react.svg";
import "./App.css";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, TDeck } from "./api/getDecks";
import { createdDeck } from "./api/createDeck";



function App() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  console.log(title);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await createdDeck(title)
    setDecks([...decks, deck])
    setTitle("");
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks()
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId)
    setDecks(decks.filter(deck => deck._id !== deckId))
  }

  return (
    <div className="App">
      <div className="decks">
        {decks.map(deck => (
          <div>
           
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}><li key={deck._id}>{deck.title}</li></Link>
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
