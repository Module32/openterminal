import { connectToDatabase } from "../../../util/db";
import { ObjectId } from 'mongodb'

async function handler(req, res) {
    const { client } = await connectToDatabase();
    const db = client.db("Genopi");
    const collection = db.collection('notes')
    if (req.method === 'PUT') {
        const { id, updateDoc } = req.body;
        const token = req.headers['apitoken'];

        if (!token) return res.status(422).json({ message: 'No token provided' })
        if (token !== process.env.API_TOKEN) return res.status(422).json({ message: `Invalid token` })
        
        await collection.updateOne({ _id: ObjectId(id) }, { $set: updateDoc })
        return res.status(201).json({ message: `Updated note` })
    } else if (req.method === 'POST') {
        const { owner } = req.body;
        const token = req.headers['apitoken'];

        if (!token) return res.status(422).json({ message: 'No token provided' })
        if (token !== process.env.API_TOKEN) return res.status(422).json({ message: `Invalid token` })
        if (!owner) return res.status(422).json({ message: 'No owner provided' })

        const note = await collection.findOne({ title: 'Untitled', content: 'Write something!', owner: owner });

        if (note) return res.status(201).json({ message: 'Found existing untitled note', note: note });
        
        const newNote = collection.insertOne({
            title: 'Untitled',
            owner: owner,
            editability: 'view',
            viewability: 'private',
            bgcolor: 'bg-white',
            starred: false,
            invUsers: [],
            content: 'Write something!'
        })
        return res.status(201).json({ message: 'Inserted note', note: newNote });
    } else {
        return res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;