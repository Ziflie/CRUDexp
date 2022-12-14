import express, {Request, Response} from "express";
import mongoose from 'mongoose'

import Deck from "./models/Deck"

const app = express()
const PORT = 5000

app.use(express.json())

app.post('/decks', async (req: Request, res: Response) => {
    console.log(req.body)
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
})



mongoose.connect (
   "mongodb+srv://RayanMeziani123:UF6vsU6f6fUDfuTG@cluster0.ndk5kn9.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
});

 