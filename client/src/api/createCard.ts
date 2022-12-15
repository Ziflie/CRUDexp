import {API_URL} from "../api/config"
import { TDeck } from "./getDecks";


export async function createCard(deckId: String, text: String): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      return response.json()
}