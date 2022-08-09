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
      <div className='row justify-content-center text-center text-light py-5'>
        <div className='col my-auto' style={{ maxWidth: '35rem' }}>
          <img className='img-fluid shadow mb-2' alt='earthquakeph' src='apple-touch-icon.png' width={70} height={70} />
          <div className='earthquakeph-text'>earthquakeph</div>
          <p className='version-text'>Version 2.2.0</p>
          <p className='mb-2 copyright-text'>This project is under the <a href='https://github.com/jpvitan/earthquakeph/blob/master/LICENSE'>MIT license</a>. Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.</p>
          <p className='mb-0 copyright-text'>Developed and Designed by <a href='https://jpvitan.com/'>Justine Paul Sanchez Vitan</a>.</p>
          <p className='mb-4 copyright-text'>Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default About
