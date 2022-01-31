import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import TextLoop from "react-text-loop";

export default function FirstPost() {
    return (
        <>
          <Layout>
            <div className="hometop">
              <div className="hometopcontent">
              <h1 style={{fontWeight: 700, fontSize: '160px', margin: 10, paddingTop: 30}}><TextLoop mask={true}>
                    <span style={{color: '#43AA8B'}}>Create</span>
                    <span style={{color: '#EF3054'}}>Develop</span>
                    <span style={{color: '#FF6F59'}}>Teach</span>
                    <span style={{color: '#574AE2'}}>Design</span>
                  </TextLoop>{" "} faster<br />than ever.</h1>
                  <p style={{paddingBottom: 30}}>Open Terminal is where innovations begin. Started for developers, OT now builds products with all creatives in mind.</p>
                  <Link href="">
                    <a className="padding" style={{marginTop: '-30px'}}>Explore solutions</a>
                  </Link>
                </div>
            </div>
            
        </Layout>
        </>
    )
  }