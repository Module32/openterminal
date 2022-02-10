  import { useSession } from "next-auth/react"
import Layout from '../components/layout'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
  const { data: session, status } = useSession()
  if (status !== "authenticated") { return 403 }
  return (
    <>
      <Layout>
      <div className="hometop">
        <h3 style={{fontSize: '40px'}}>{session.user.name}</h3>
        <p>{session.user.email}</p>
        </div>
      </Layout>
    </>
  )
}