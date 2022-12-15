import { config } from "dotenv";
config()
import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import Deck from "./models/Deck";
import cors from "cors"
import { getDecksController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController"

const app = express();
const PORT = 5000;

app.use(cors({
    origin: "*"
  })
);


app.use(express.json());

app.get("/decks", getDecksController)
app.post("/decks", createDeckController)
app.delete("/decks/:deckId", deleteDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController)



mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
});

 