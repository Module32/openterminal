import useSWR from 'swr'
import fetch from 'unfetch'
import Layout from '../../components/layout'
import Link from 'next/link'
import { faAnglesRight } from '@fortawesome/fontawesome-free-solid'

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR("/api/unlockapi/src/loadrepos", fetcher)
  console.log(data);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  if (!data.repos) return <div>Looks like there are no repos under your account!</div>

  const listItems = data.repos.map((repo) =>
    <div key={repo}>
      <h3>{repo} <span><Link href="/"><a style={{marginLeft: '10px'}}>Connect <FontAwesomeIcon icon="angles-right" /></a></Link></span></h3>
      <hr />
    </div>
  );

  return (
    <>
      <Layout>
        <div className="hometop" style={{paddingTop: '50px'}}>
          <h1>New UnlockAPI Project</h1>
          <div style={{width: '30%', margin: 'auto'}}>
            {listItems}
          </div>
        </div>
      </Layout>
    </>
  )
}