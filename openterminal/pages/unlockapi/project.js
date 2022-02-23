import useSWR from 'swr'
import fetch from 'unfetch'
import { useSession } from "next-auth/react"

export default function Project() {
  const { data: session, status } = useSession()
  const fetcher = url => fetch(url).then(r => r.json())
  
  const { data, error } = useSWR(`/api/unlockapi/loadrepos/${session.user.name}`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return data.repos;
}