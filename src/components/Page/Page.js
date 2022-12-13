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

const Page = () => {
  const iconStyle = { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' }

  return (
    <>
      <PageButton name='about' content={About} icon={Icon.About(iconStyle)} style={{ right: '1.5rem', bottom: '3rem' }} />
      <PageButton name='history' content={History} icon={Icon.History(iconStyle)} style={{ left: '1.5rem', bottom: '8rem' }} />
      <PageButton name='settings' content={Settings} icon={Icon.Settings(iconStyle)} style={{ left: '1.5rem', bottom: '3rem' }} />
    </>
  )
}

const PageButton = ({ name, content, icon, style }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div className='page-button shadow-lg' style={style} onClick={() => { setVisible(true) }}>
        {icon}
      </div>
      {visible && <PageContent name={name} content={content} closeAction={() => setVisible(false)} />}
    </>
  )
}

const PageContent = ({ name, closeAction, content }) => {
  return (
    <div className={name}>
      <div className='container-fluid'>
        <div className='row px-2 py-4'>
          <div className='col my-auto'>
            <div className='window-heading'>{name.toUpperCase()}</div>
          </div>
          <div className='col-auto my-auto'>
            <div className='close-icon-container shadow-lg' onClick={closeAction}>
              {Icon.Close({ width: '40px', height: '40px' })}
            </div>
          </div>
        </div>
        {content(closeAction)}
      </div>
    </div>
  )
}

export default Page
