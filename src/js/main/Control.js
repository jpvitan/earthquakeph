/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const Control = ({ configuration, engine, earthquake }) => {
  return (
    <div className='control'>
      <LeftControl
        configuration={configuration}
        engine={engine}
        earthquake={earthquake}
      />
    </div>
  )
}

const LeftControl = ({ configuration, engine, earthquake }) => {
  return (
    <div className='left-control shadow-lg'>
      <div className='container-fluid px-0'>

      </div>
    </div>
  )
}

export default Control
