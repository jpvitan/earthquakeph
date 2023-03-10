/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export const ScreenLoading = ({ visible }) => {
  return (
    <>
      {visible &&
        <div className='screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center'>
                <img className='shadow-lg' alt='EarthquakePH' src='apple-touch-icon.png' width={70} height={70} />
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export const ScreenMessage = ({ visible, title, message, onClose }) => {
  return (
    <>
      {visible &&
        <div className='screen'>
          <div className='container h-100'>
            <div className='row justify-content-center h-100'>
              <div className='col-auto my-auto text-center'>
                <p className='text-size-xl'>{title}</p>
                <p>{message}</p>
                <button className='button button-color-orange btn shadow-lg mt-3 px-4 py-2' onClick={onClose}>Close</button>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}
