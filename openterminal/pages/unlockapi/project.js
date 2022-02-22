import useSWR from 'swr'
import fetch from 'unfetch'

const fetcher = url => fetch(url).then(r => r.json())

export default function Project() {
  const { data, error } = useSWR('/api/unlockapi/loadrepos', fetcher)

  if (error) return "failed to retrieve data"

  return data.repos;
}