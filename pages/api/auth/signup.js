// from https://dev.to/dawnind/authentication-with-credentials-using-next-auth-and-mongodb-part-1-m38

import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        if (!email || !email.includes('@') || !password) {
            return res.status(422).json({ message: 'Invalid Data' });
        }
        const client = await MongoClient.connect(
            `mongodb+srv://module64:openterminal32_64@cluster0.mlmfm.mongodb.net/?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db('Mainweb');
        const checkExisting = await db
            .collection('users')
            .findOne({ email: email });

        if (checkExisting) {
            client.close();
            return res.status(422).json({ message: 'User already exists' });
        }
        //Hash password
        const status = await db.collection('users').insertOne({
            email,
            password: await hash(password, 12),
        });

        client.close();

        return res.status(201).json({ message: 'User created', ...status });
    } else {
        //Response for other than POST method
        return res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;