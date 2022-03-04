import useSWR from 'swr'
import fetch from 'unfetch'
import { useSession } from "next-auth/react"
import Layout from '../../components/layout'

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data: session, status } = useSession()
  const { ledata, error } = useSWR(status === "authenticated" ? `/api/unlockapi/loadrepos/${session.user.name}` : null, fetcher)
  if (status !== "authenticated") { return 403 }

  if (error) return <div>failed to load</div>
  if (!ledata) return <div>loading...</div>

  return (
    <>
      <Layout>
        {ledata}
      </Layout>
    </>
  )
}