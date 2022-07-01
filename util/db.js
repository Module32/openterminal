import { MongoClient } from 'mongodb'

let uri = process.env.MONGO_URI

let cachedClient = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (cachedClient) {
    return { client: cachedClient }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  cachedClient = client

  return { client }
}