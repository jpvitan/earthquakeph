/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import './About.scss'

const About = ({ onClose, earthquake }) => {
  return (
    <div className='about'>
      <div className='container-fluid px-0'>
        <div className='row justify-content-center'>
          <div className='notice col px-4 py-4'>
            <section>
              <img className='img-fluid shadow-lg mb-3' alt='earthquakeph' src='apple-touch-icon.png' width='90' height='90' />
              <h1>earthquakeph</h1>
              <p>A highly customizable real-time web application that tracks the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.</p>
            </section>
            <section className='mt-5'>
              <h2>Developer</h2>
              <p>Developed and designed by <a href='https://jpvitan.com/'>Justine Paul Vitan</a> as a solo project to demonstrate his capabilities in building top-quality web applications. The source code of this project is open and available via <a href='https://github.com/jpvitan/earthquakeph'>GitHub</a>.</p>
            </section>
            <section className='mt-5'>
              <h2>License</h2>
              <p>This project is under the <a href='https://github.com/jpvitan/earthquakeph/blob/master/LICENSE'>MIT license</a>. Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.</p>
            </section>
            <section className='version mt-5'>
              <p>Version 3.0.0</p>
              <p>Copyright © 2022 Justine Paul Vitan. All rights reserved.</p>
            </section>
            <section className='link mt-5'>
              <a href='https://jpvitan.com/'>Developer's Website</a>
              <a href='https://github.com/jpvitan/earthquakeph'>Source Code</a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
