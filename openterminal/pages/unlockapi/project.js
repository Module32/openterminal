import useSWR from 'swr'
import fetch from 'unfetch'
import { useSession } from "next-auth/react"

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data: session, status } = useSession()
  if (status !== "authenticated") { return 403 }

  let username = session.user.name;
  
  const { ledata, error } = useSWR(`/api/unlockapi/loadrepos/${username}`, fetcher)

  if (error) return <div>failed to load</div>
  if (!ledata) return <div>loading...</div>

  return data.repos;
}