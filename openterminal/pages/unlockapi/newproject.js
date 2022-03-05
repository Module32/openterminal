import useSWR from 'swr'
import fetch from 'unfetch'
import Layout from '../../components/layout'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/fontawesome-free-solid'

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR("/api/unlockapi/src/loadrepos", fetcher)
  console.log(data);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  if (!data.repos) return <div>Looks like there are no repos under your account!</div>

  const listItems = data.repos.map((repo) =>
    <div key={repo} style={{padding: '5px', borderRadius: '10px', border: 'none', margin: '5px', backgroundColor: 'rgb(46, 46, 46, 0.4)', display: 'flex', flexDirection: 'row'}}>
      <h3 style={{marginLeft: '7px'}}>{repo}</h3>
      <h3 style={{marginLeft: 'auto', marginRight: '7px'}}><span><Link href="/"><a>Connect <FontAwesomeIcon icon="arrow-right" /></a></Link></span></h3>
    </div>
  );

  return (
    <>
      <Layout>
        <div className="waves2">
          <h1 style={{marginTop: '60px'}}>New Project</h1>
          <p>Welcome! Let&apos;s get you started with a new UnlockAPI Project.</p>
          <div className="acrylic">
            <div style={{width: '40%'}}>
              <h2>Choose a repository to import...</h2>
              {listItems}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}