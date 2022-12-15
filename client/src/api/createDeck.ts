import {API_URL} from "../api/config"


export async function createdDeck(title: String,) {
    const response = await fetch(`${API_URL}/decks`, {
        method: "POST",
        body: JSON.stringify({
          title,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      return response.json()
}