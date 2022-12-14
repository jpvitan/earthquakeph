/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Icon from '../../utility/Icon'
import About from '../../pages/About'
import History from '../../pages/History'
import Settings from '../../pages/Settings'
import { useState } from 'react'
import './Page.css'

const Page = (globalProperties) => {
  const iconStyle = { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' }

  return (
    <>
      <PageButton globalProperties={globalProperties} name='about' content={About} icon={Icon.About(iconStyle)} style={{ right: '1.5rem', bottom: '3rem' }} />
      <PageButton globalProperties={globalProperties} name='history' content={History} icon={Icon.History(iconStyle)} style={{ left: '1.5rem', bottom: '8rem' }} />
      <PageButton globalProperties={globalProperties} name='settings' content={Settings} icon={Icon.Settings(iconStyle)} style={{ left: '1.5rem', bottom: '3rem' }} />
    </>
  )
}

const PageButton = (pageProperties) => {
  const [visible, setVisible] = useState(false)

  const { style, icon } = pageProperties

  return (
    <>
      <div className='page-button shadow-lg' style={style} onClick={() => { setVisible(true) }}>
        {icon}
      </div>
      {visible && <PageContent {...pageProperties} onClose={() => setVisible(false)} />}
    </>
  )
}

const PageContent = ({ name, onClose, content, globalProperties }) => {
  return (
    <div className={name}>
      <div className='container-fluid'>
        <div className='row px-2 py-4'>
          <div className='col my-auto'>
            <div className='window-heading'>{name.toUpperCase()}</div>
          </div>
          <div className='col-auto my-auto'>
            <div className='close-icon-container shadow-lg' onClick={onClose}>
              {Icon.Close({ width: '40px', height: '40px' })}
            </div>
          </div>
        </div>
        {content(onClose, globalProperties)}
      </div>
    </div>
  )
}

export default Page
