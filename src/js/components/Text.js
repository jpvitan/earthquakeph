/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export const TextXS = ({ style, children }) => {
  return (
    <p className='text-size-xs fw-bold mb-0' style={style}>
      {children}
    </p>
  )
}

export const TextSM = ({ style, children }) => {
  return (
    <p className='text-size-sm fw-bold mb-0' style={style}>
      {children}
    </p>
  )
}

export const TextMD = ({ style, children }) => {
  return (
    <p className='text-size-md fw-bold mb-0' style={style}>
      {children}
    </p>
  )
}

export const TextLG = ({ style, children }) => {
  return (
    <p className='text-size-lg fw-bold mb-0' style={style}>
      {children}
    </p>
  )
}

export const TextXL = ({ style, children }) => {
  return (
    <p className='text-size-xl fw-bold mb-0' style={style}>
      {children}
    </p>
  )
}
