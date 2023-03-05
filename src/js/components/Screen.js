/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Utility from '../utilities/Utility'
import { useState, useEffect } from 'react'

export const ScreenLoading = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => { Utility.display.toggleLoadingVisibility = (visible) => setVisible(visible) }, [])

  return (
    <>
      {visible &&
        <div className='screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center'>
                <img className='shadow mb-4' alt='EarthquakePH' src='apple-touch-icon.png' width={70} height={70} />
                <div className='d-flex justify-content-center mb-5'>
                  <div className='spinner-border text-danger' role='status' />
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export const ScreenMessage = () => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [onClose, setOnClose] = useState(null)

  useEffect(() => {
    Utility.display.toggleMessageScreen = (visible, title, message, onClose) => {
      setVisible(visible)
      setTitle(title)
      setMessage(message)
      setOnClose(() => onClose)
    }
  }, [])

  const handleOnClose = () => {
    setVisible(false)
    onClose && onClose()
  }

  return (
    <>
      {visible &&
        <div className='screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center'>
                <p className='text-size-xl'>{title}</p>
                <p>{message}</p>
                <button className='button button-color-orange btn shadow-lg mt-3 px-4 py-2' onClick={handleOnClose}>Close</button>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}
