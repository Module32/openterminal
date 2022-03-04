import useSWR from 'swr'
import fetch from 'unfetch'
import Layout from '../../components/layout'

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { ledata, error } = useSWR("/api/unlockapi/src/loadrepos", fetcher)
  console.log(ledata);

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