/*
============================================================
earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.
============================================================
*/

import { CloseIcon } from '../Icon'
import '../css/Pages.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const About = (closeWindowAction) => {
  return (
    <div className='about'>
      <div className='container-fluid'>
        <div className='row px-2 py-3'>
          <div className='col my-auto'>
            <div className='window-heading'>ABOUT</div>
          </div>
          <div className='col-auto my-auto'>
            <div style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={closeWindowAction}>
              {CloseIcon({ width: '50px', height: '50px' })}
            </div>
          </div>
        </div>
        <div className='row justify-content-center text-center py-5'>
          <div className='col-auto my-auto'>
            <img className='img-fluid shadow' alt='earthquakeph' src='apple-touch-icon.png' width={70} height={70} />
            <div className='mt-2 earthquakeph-text'>earthquakeph</div>
            <p style={{ fontWeight: 'bold' }}>Version 2.1.0</p>
            <p className='mb-0' style={{ fontSize: '0.7rem', fontWeight: '500' }}>Developed and Designed by Justine Paul Sanchez Vitan.</p>
            <p className='mb-0' style={{ fontSize: '0.7rem', fontWeight: '500' }}>Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
