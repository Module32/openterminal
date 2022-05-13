import Layout from '../../../components/layout'
import Footer from '../../../components/footer'
import Tiptap from '../../../components/Tiptap'
import Link from 'next/link'
import { useSession } from "next-auth/react"
import redis from "redis"
import { useRouter } from 'next/router'

export default async function Project() {
    const router = useRouter()
    const { num } = router.query

    var client = redis.createClient ({
      host : process.env.GENOPI_HOST,
      port : process.env.GENOPI_PORT,
      password: process.env.GENOPI_PASSWORD
    });
    
    client.on("error", function(err) {
      throw err;
    });
    
    const test = await client.json.get(`genopi-${session.user.name}-${session.email}`, {
        path: [
          `.tests[${num}]`
        ]
    });

    console.log(test);

    if (status !== "authenticated") { return "Log in to access this page!" }
    return (
      <>
        <Layout>
            <div className="hometop" style={{textAlign: 'left', paddingTop: '70px'}}>
                <p>console?</p>
            </div>
        </Layout>
        <Footer></Footer>
      </>
    )
}