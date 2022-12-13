/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import About from './About'
import History from './History'
import Settings from './Settings'
import Icon from '../assets/img/svg/Icon'
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

const PageButton = (props) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div className='page-button shadow-lg' style={props.style} onClick={() => { setVisible(true) }}>
        {props.icon}
      </div>
      {visible && <PageContent name={props.name} content={props.content} closeAction={() => setVisible(false)} />}
    </>
  )
}

const PageContent = (props) => {
  const name = props.name
  const closeAction = props.closeAction
  const content = props.content

  return (
    <>
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
    </>
  )
}

export default Page
