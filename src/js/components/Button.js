/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export const ButtonPill = ({ onClick, children }) => {
  return (
    <button className='button-pill btn shadow-lg px-4 py-2' onClick={onClick}>
      {children}
    </button>
  )
}

export const ButtonIcon = ({ onClick, children }) => {
  return (
    <div className='button-icon d-flex justify-content-center align-items-center shadow-lg' onClick={onClick}>
      {children}
    </div>
  )
}
