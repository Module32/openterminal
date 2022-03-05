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
    <div key={repo}>
      <h3>{repo} <span><Link href="/"><a style={{marginLeft: '10px'}}>Connect <FontAwesomeIcon icon="arrow-right" /></a></Link></span></h3>
      <hr />
    </div>
  );

  return (
    <>
      <Layout>
        <div className="waves2">
          <div class="acrylic">
            <h1>New Project</h1>
            <p>Welcome! Let&apos;s get you started with a new UnlockAPI Project.</p>
          </div>
          <div class="acrylic">
            <h3>Choose a repository to import...</h3>
            <div style={{width: '30%', margin: 'auto'}}>
              {listItems}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}