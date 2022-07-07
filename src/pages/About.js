/*
============================================================
earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.
============================================================
*/

const About = () => {
  return (
    <>
      <div className='row justify-content-center text-center py-5'>
        <div className='col-auto my-auto'>
          <img className='img-fluid shadow mb-2' alt='earthquakeph' src='apple-touch-icon.png' width={70} height={70} />
          <div className='earthquakeph-text'>earthquakeph</div>
          <p style={{ fontWeight: 'bold' }}>Version 2.1.0</p>
          <p className='mb-0' style={{ fontSize: '0.7rem', fontWeight: '500' }}>Developed and Designed by Justine Paul Sanchez Vitan.</p>
          <p className='mb-0' style={{ fontSize: '0.7rem', fontWeight: '500' }}>Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default About
