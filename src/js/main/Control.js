/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { ButtonIcon } from '../components/Button'

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
  const page = [
    'history',
    'location',
    'settings'
  ]
  const props = {
    configuration,
    engine,
    earthquake
  }

  return (
    <div className='left-control'>
      <div className='container-fluid px-0'>
        {page.map(name =>
          <div className='row g-0' key={name}>
            <div className='col-auto my-2'>
              <ButtonIcon onClick={() => { configuration.page.togglePage({ name, props }) }}>
                {configuration.page[name].icon}
              </ButtonIcon>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Control
