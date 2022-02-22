import useSWR from 'swr'
import fetch from 'unfetch'

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  
  const { data, error } = useSWR('/api/unlockapi/loadrepos', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return data.repos;
}