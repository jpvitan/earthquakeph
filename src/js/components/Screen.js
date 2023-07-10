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

export const ScreenMessage = ({ title, message, onClose }) => {
  return (
    <div className='screen animation-grow'>
      <div className='container h-100'>
        <div className='row justify-content-center h-100'>
          <div className='col-auto my-auto text-center px-4 py-4'>
            <Player autoplay loop src='https://assets10.lottiefiles.com/packages/lf20_p7ki6kij.json' style={{ height: '100px', width: '100px' }} />
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
