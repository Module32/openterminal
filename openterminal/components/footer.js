import styles from './layout.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer>
      {/* GREEN: #57cc99 -- All systems up. YELLOW: #F6AE2D -- Maintenance */}
      <div style={{ display: "flex" }}>
        <div>
          <h4 className="codefont">Presenting</h4>
          <h1 className="codefont">Open Terminal</h1>
          <p className="codefont">By Brinmeet Soin and Ekya Dogra</p>
        </div>
        <div style={{ marginLeft: 40 }}>
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
        <div style={{ flexDirection: "row", marginLeft: 40 }}>
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
        <div style={{ flexDirection: "row", marginLeft: 40 }}>
          <h4>Initiatives</h4>
          <div className="grey" style={{ marginTop: "-10px", fontSize: 15 }}>
            <p>
              <Link href="/">
                  <a className="footer">Bot Building Site</a>
              </Link>
            </p>
          </div>
        </div>
        <div style={{ flexDirection: "row", marginLeft: 40 }}>
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
      </div>
      <div style={{ display: "flex" }}>
        <a href="google.com" className="socials"><FontAwesomeIcon icon={faDiscord}/></a>
      </div>
    </footer>
  )
}