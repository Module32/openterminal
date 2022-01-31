import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Image from 'next/image'

const name = 'Module64'
export const siteTitle = 'Open Terminal'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/pics/ot-logo.png" />
        <meta property="og:description" content="Open Terminal is focused on delivering software and hardware solutions for all people. Find tools that help you create, teach, and do things better." />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Open Terminal - Creating for all</title>
      </Head>
      <header className={styles.header}>
          <>
          <ul>
            <li><Link href="/">
              <a className="navbar">Home</a>
            </Link></li>

            <li><Link href="/">
              <a className="navbar">Why OT</a>
            </Link></li>

            <li><Link href="/">
              <a className="navbar">Solutions</a>
            </Link></li>
            
            <div className="totheright">
              <li><Link href="/">
                <a className="navbar">Sign up</a>
              </Link></li>
              <li><Link href="/">
                <a className="padding" style={{padding:'12px 20px'}}>Log in</a>
              </Link></li>
            </div>
          </ul>
          </>
      </header>
      <hr></hr>
      <div className={styles.card}><main>{children}</main></div>
    <footer>
  {/* GREEN: #57cc99 -- All systems up. YELLOW: #F6AE2D -- Maintenance */}
  <div style={{ display: "flex" }}>
    <div>
      <h4>Products</h4>
      <div className="grey" style={{ marginTop: "-10px", fontSize: 15 }}>
        <p>
          <Link href="/">
              <a className="footer">Marble</a>
          </Link>
          <br />
          <Link href="/">
              <a className="footer">UnlockAPI</a>
          </Link>
          <br />
          <Link href="/">
              <a className="footer">Lexicon</a>
          </Link>
          <br />
          <Link href="/">
              <a className="footer">Cramer's Rule</a>
          </Link>
          <br />
          <Link href="/">
              <a className="footer">Dihybrids</a>
          </Link>
        </p>
      </div>
    </div>
    <div style={{ flexDirection: "row", marginLeft: 45 }}>
      <h4>Sectors</h4>
      <div className="grey" style={{ marginTop: "-10px", fontSize: 15 }}>
        <p>
          <Link href="/">
              <a className="footer">Development</a>
          </Link>
          <br />
          <Link href="/">
              <a className="footer">Education</a>
          </Link>
        </p>
      </div>
    </div>
    <div style={{ flexDirection: "row", marginLeft: 45 }}>
      <h4>Initiatives</h4>
      <div className="grey" style={{ marginTop: "-10px", fontSize: 15 }}>
        <p>
          <Link href="/">
              <a className="footer">Bot Building Site</a>
          </Link>
        </p>
      </div>
    </div>
    <div style={{ flexDirection: "row", marginLeft: 45 }}>
      <h4>Legal</h4>
      <div className="grey" style={{ marginTop: "-10px", fontSize: 15 }}>
        <p>
          <Link href="/">
              <a className="footer">Terms of Service</a>
          </Link>
          <br />
          <Link href="/">
              <a className="footer">Privacy Policy</a>
          </Link>
          <br />
          <Link href="/">
              <a className="footer">Assets</a>
          </Link>
        </p>
      </div>
    </div>
  </div>
  <hr style={{ backgroundColor: "rgb(110, 110, 110)" }} />
  <div style={{ display: "flex", marginTop: "-5px" }}>
    <h5 className="grey">
      ©2021- | Open Terminal Company, managed by Ekya Dogra and Brinmeet Soin.{" "} <Link href="mailto: OpenTerminalCo@gmail.com">
          <a className="footer">Email us</a>
        </Link> for questions or
      support.
    </h5>
    <h5 style={{ flexDirection: "row", marginLeft: "auto" }} className="grey">
      <a href="https://www.youtube.com/watch?v=X7qXk1PFqcw" className="footer">
        And that's the end! ^-^
      </a>
    </h5>
  </div>
</footer>
    </div>

  )
}