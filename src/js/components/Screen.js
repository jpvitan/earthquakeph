/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { ButtonPill, ButtonIcon } from './Button'
import Icon from '../utilities/Icon'
import { Player } from '@lottiefiles/react-lottie-player'

const lottie = {
  success: 'https://lottie.host/9747e778-7703-4e95-b9bd-5520d000dad7/AF5wKlfnuQ.json',
  error: 'https://assets10.lottiefiles.com/packages/lf20_p7ki6kij.json',
  location: 'https://lottie.host/1ba3a658-37b7-40bc-9300-f0033a1014fc/5jMz8J2sNI.json'
}

export const ScreenLoading = () => {
  return (
    <div className='screen animation-grow'>
      <div className='container h-100'>
        <div className='row justify-content-center h-100'>
          <div className='col-auto my-auto text-center'>
            <img className='animation-fade shadow-lg' alt='EarthquakePH' src='apple-touch-icon.png' width={70} height={70} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const ScreenMessage = ({ icon, title, message, onClose }) => {
  return (
    <div className='screen animation-grow'>
      <div className='container h-100'>
        <div className='row justify-content-center h-100'>
          <div className='content-xs col my-auto text-center px-4 py-4'>
            <Player autoplay loop src={lottie[icon]} style={{ height: '100px', width: '100px' }} />
            <p className='text-size-xl fw-bold'>{title}</p>
            <p className='mb-5'>{message}</p>
            <ButtonPill onClick={onClose}>Close</ButtonPill>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ScreenContent = ({ title, onClose, Content, props }) => {
  return (
    <div className='screen animation-grow'>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='content-sm col px-4 py-4'>
            <div className='row'>
              <div className='col my-auto'>
                <p className='text-size-xl fw-bold mb-0'>{title}</p>
              </div>
              <div className='col-auto my-auto'>
                <ButtonIcon onClick={onClose}>{Icon.Close()}</ButtonIcon>
              </div>
            </div>
            <Content {...props} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}
