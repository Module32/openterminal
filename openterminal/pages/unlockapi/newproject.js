import useSWR from 'swr'
import fetch from 'unfetch'
import Layout from '../../components/layout'
import Footer from '../../components/footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/fontawesome-free-solid'
import { useState } from "react";

export default function Project() {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR("/api/unlockapi/src/loadrepos", fetcher)
  const [content, setContent] = useState(<h4>Please select a repository!</h4>);
  const [query, setQuery] = useState("");

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  if (!data.repos) return <div>Looks like there are no repos under your account!</div>

  const listItems = data.repos.filter(repo => {
    if (query === '') {
      return repo;
    } else if (repo.toLowerCase().includes(query.toLowerCase())) {
      return repo;
    }
  }).map((repo) =>
    <div key={repo} style={{padding: '5px', borderRadius: '10px', border: 'none', margin: '5px', backgroundColor: 'rgb(235, 235, 235, 0.7)', display: 'flex', flexDirection: 'row'}}>
      <h3 style={{marginLeft: '7px', color: 'black'}}>{repo}</h3>
      <h3 style={{marginLeft: 'auto', marginRight: '7px'}}><span><Link href=""><a onClick={() => setContent(<h2><span className="grey">Connect </span>{data.user}/{repo}</h2>)}>Connect <FontAwesomeIcon icon="arrow-right" /></a></Link></span></h3>
    </div>
  );

  return ( 
    <>
      <Layout>
        <div className="waves2">
          <h1 style={{marginTop: '60px'}}>New Project</h1>
          <p>Welcome! Let&apos;s get you started with a new UnlockAPI Project.</p>
          <div className="acrylic" style={{display: 'flex'}}>
            <div style={{flex: '1', paddingRight: '15px'}}>
              <h2>Choose a repository to import...</h2>
              <input placeholder="Search up repo" onChange={event => setQuery(event.target.value)} style={{width: '98%'}} />
              <div style={{height: '250px', overflow: 'scroll', padding: '10px', borderRadius: '10px', backgroundColor: 'rgb(46, 46, 46, 0.45)'}}>
                {listItems}
              </div>
            </div>
            <div style={{flex: '1', borderLeft: '2px solid rgb(255, 255, 255, 0.2)', paddingLeft: '15px'}}>
              {content}
            </div>
          </div>
        </div>
      </Layout>
      <Footer>
      </Footer>
    </>
  )
}