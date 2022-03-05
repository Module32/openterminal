import useSWR from 'swr'
import fetch from 'unfetch'
import Layout from '../../components/layout'
import Link from 'next/link'

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR("/api/unlockapi/src/loadrepos", fetcher)
  console.log(data);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  if (!data.repos) return <div>Looks like there are no repos under your account!</div>

  const listItems = data.repos.map((repo) =>
    <div key={repo}>
      <h2>{repo} <Link href="/"><a className="discord" style={{marginLeft: '10px'}}>Connect</a></Link></h2>
      <hr />
    </div>
  );

  return (
    <>
      <Layout>
        <h1>New UnlockAPI Project</h1>
        <div className="hometop">
          {listItems}
        </div>
      </Layout>
    </>
  )
}