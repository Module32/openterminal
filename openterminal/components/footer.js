import styles from './layout.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
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
                  <a className="footer">Cramer&apos;s Rule</a>
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
        <div style={{ flexDirection: "row", marginLeft: 'auto' }}>
        <h2 style={{fontWeight: '300'}}>OT</h2>
  </div>
      </div>
      <hr style={{ backgroundColor: "rgb(110, 110, 110)" }} />
      <div style={{ display: "flex", marginTop: "-5px" }}>
        <h5 className="grey">
          ©2021-{new Date().getFullYear()} | Open Terminal Company, managed by Ekya Dogra and Brinmeet Soin.{" "} <Link href="mailto: OpenTerminalCo@gmail.com">
              <a className="footer">Email us</a>
            </Link> for questions or
          support.
        </h5>
        <h5 style={{ flexDirection: "row", marginLeft: "auto" }} className="grey">
          <a href="https://www.youtube.com/watch?v=X7qXk1PFqcw" className="footer">
            And that&apos;s the end! ^-^
          </a>
        </h5>
      </div>
    </footer>
  )
}