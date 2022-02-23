import useSWR from 'swr'
import fetch from 'unfetch'
import { useSession } from "next-auth/react"

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data: session, status } = useSession()
  const { ledadata, error } = useSWR(status === "authenticated" ? `/api/unlockapi/loadrepos/${session.user.username}` : null, fetcher)
  if (status !== "authenticated") { return 403 }

  if (error) return <div>failed to load</div>
  if (!ledata) return <div>loading...</div>

  return data.repos;
}