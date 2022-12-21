/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Icon from '../../utility/Icon'
import About from '../../pages/About/About'
import History from '../../pages/History/History'
import Settings from '../../pages/Settings/Settings'
import { useState } from 'react'
import './Page.scss'

const Page = ({ earthquake }) => {
  const iconStyle = { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px' }

  return (
    <div className='page'>
      <Button earthquake={earthquake} name='about' content={About} icon={Icon.About(iconStyle)} style={{ right: '1.5rem', bottom: '3rem' }} />
      <Button earthquake={earthquake} name='history' content={History} icon={Icon.History(iconStyle)} style={{ left: '1.5rem', bottom: '8rem' }} />
      <Button earthquake={earthquake} name='settings' content={Settings} icon={Icon.Settings(iconStyle)} style={{ left: '1.5rem', bottom: '3rem' }} />
    </div>
  )
}

const Button = (properties) => {
  const [visible, setVisible] = useState(false)

  const { style, icon } = properties

  return (
    <>
      <div className='button shadow-lg' style={style} onClick={() => { setVisible(true) }}>
        {icon}
      </div>
      {visible && <Content {...properties} onClose={() => setVisible(false)} />}
    </>
  )
}

const Content = ({ name, onClose, content, earthquake }) => {
  return (
    <div className='content'>
      <div className='container-fluid px-4'>
        <div className='row py-4'>
          <div className='col my-auto'>
            <div className='heading'>{name.toUpperCase()}</div>
          </div>
          <div className='col-auto my-auto'>
            <div className='close-icon-container shadow-lg' onClick={onClose}>
              {Icon.Close({ display: 'block', position: 'relative', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '40', height: '40' })}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {content(onClose, earthquake)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
