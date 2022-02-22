import useSWR from 'swr'
import fetch from 'unfetch'

const fetcher = url => fetch(url).then(r => r.json())

export default function Project() {
  const { data, error } = useSWR('/api/unlockapi/loadrepos', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return data.repos;
}