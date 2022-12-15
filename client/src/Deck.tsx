import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import reactLogo from "./assets/react.svg";
import "./App.css";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, TDeck } from "./api/getDecks";
import { createdDeck } from "./api/createDeck";
import { createCard } from "./api/createCard";




export default function Deck() {
    const [text, setText] = useState("")
    const [cards, setCards] = useState<string[]>([])
    let { deckId } = useParams()

    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();
        const {cards: serverCards} = await createCard(deckId!, text)
        setCards(serverCards)
        setText("");
      }


      return (
        <div className="App">
    <div className="decks">
        {cards.map(card => (
          <div>
           {card}
            {/* <button onClick={() => handleDeleteDeck(card._id)}>X</button> */}
            {/* <Link to={`decks/${card._id}`}><li key={card._id}>{card.title}</li></Link> */}
          </div>
        ))}
      </div>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor="card-text">Card Text</label>
          <input
            id="card-text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
            }}
          />
          <button>Create card</button>
        </form>
      </div>
      )
}