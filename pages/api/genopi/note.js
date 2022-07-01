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
        
        collection.updateOne({ _id: ObjectId(id) }, {$set: updateDoc }, function(err, res) {
            if (err) return res.status(422).json({ message: 'Update failed', err: err });
        })
        return res.status(201).json({ message: 'Updated note' })
    } else {
        return res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;