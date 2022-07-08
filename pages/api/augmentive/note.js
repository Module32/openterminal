import { connectToDatabase } from "../../../util/db";
import { ObjectId } from 'mongodb'

async function handler(req, res) {
    const { client } = await connectToDatabase();
    const db = client.db("Genopi");
    const collection = db.collection('notes')
    if (req.method === 'PUT') {
        const { id, updateDoc, apitoken } = req.body;

        if (!apitoken) return res.status(422).json({ message: 'No token provided' })
        if (apitoken !== process.env.NEXT_PUBLIC_API_TOKEN) return res.status(422).json({ message: `Invalid token: ${token}` })
        if (!id) return res.status(422).json({ message: `No ID provided` })
        if (!updateDoc) return res.status(422).json({ message: `No update doc provided` })
        
        await collection.updateOne({ _id: ObjectId(id) }, { $set: updateDoc })
        return res.status(201).json({ message: `Updated note` })
    } else if (req.method === 'POST') {
        const { owner, apitoken } = req.body;

        if (!apitoken) return res.status(422).json({ message: 'No token provided' })
        if (apitoken !== process.env.NEXT_PUBLIC_API_TOKEN) return res.status(422).json({ message: `Invalid token` })
        if (!owner) return res.status(422).json({ message: 'No owner provided' })

        const filter = {
            title: 'Untitled',
            owner: owner,            
            editability: 'view',           
            viewability: 'private',            
            bgcolor: 'bg-white',
            starred: false,
            invUsers: [],
            content: 'Write something!'
        }

        const updateDoc = { $set: filter }

        await collection.updateOne(filter, updateDoc, { upsert: true })
        const newNote = await collection.findOne(filter)
        return res.status(201).json({ message: 'Inserted note', note: newNote });
    } else {
        return res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;