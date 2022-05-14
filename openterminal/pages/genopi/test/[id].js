import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Tiptap from '../../../components/Tiptap'
import Link from 'next/link'
import { useSession } from "next-auth/react"
import redis from "redis"
import { useRouter } from 'next/router'
import { MongoClient, ServerApiVersion } from 'mongodb';

export default async function Project() {
    const router = useRouter()
    const { id } = router.query

    const uri = process.env.MONGO_GENOPI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await client.connect();

    let test = client.db('Genopi').collection('Tests').find({"_id": id});
    if (!test) return 404;

    if (status !== "authenticated") { return "Log in to access this page!" }
    return (
      <>
        <Layout>
            <div className="hometop" style={{textAlign: 'left', paddingTop: '70px'}}>
                <h1>{test.name}</h1>
                <p className="grey">{test.creator.split("::-")[1]} • {test.date}</p>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}