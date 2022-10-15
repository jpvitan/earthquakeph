/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

const About = (closeAction) => {
  return (
    <>
      <div className='row justify-content-center text-light px-2 py-5'>
        <div className='col my-auto' style={{ maxWidth: '35rem' }}>
          <div className='card border-0 shadow-sm px-3 py-3'>
            <div className='text-center'>
              <img className='img-fluid shadow mb-2' alt='earthquakeph' src='apple-touch-icon.png' width={60} height={60} />
              <div className='earthquakeph-text'>earthquakeph</div>
              <p className='version-text'>Version 2.3.1</p>
            </div>
            <div className='copyright-text'>
              <p>This project is under the <a href='https://github.com/jpvitan/earthquakeph/blob/master/LICENSE'>MIT license</a>. Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.</p>
              <p className='mb-0'>Developed and Designed by <a href='https://jpvitan.com/'>Justine Paul Sanchez Vitan</a>.</p>
              <p className='mb-0'>Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
