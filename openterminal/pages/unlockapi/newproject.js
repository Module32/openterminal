import useSWR from 'swr'
import fetch from 'unfetch'
import Layout from '../../components/layout'

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR("/api/unlockapi/src/loadrepos", fetcher)
  console.log(data);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <Layout>
        {data.repos}
      </Layout>
    </>
  )
}