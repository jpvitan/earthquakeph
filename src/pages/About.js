/*
============================================================
earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.
============================================================
*/

const About = (closeAction) => {
  return (
    <>
      <div className='row justify-content-center text-center text-light py-5'>
        <div className='col-auto my-auto'>
          <img className='img-fluid shadow mb-2' alt='earthquakeph' src='apple-touch-icon.png' width={70} height={70} />
          <div className='earthquakeph-text'>earthquakeph</div>
          <p className='version-text'>Version 2.1.0</p>
          <p className='mb-0 copyright-text'>Developed and Designed by Justine Paul Sanchez Vitan.</p>
          <p className='mb-0 copyright-text'>Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default About
