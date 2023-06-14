/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import History from '../pages/History'
import Location from '../pages/Location'
import Settings from '../pages/Settings'
import Icon from '../utilities/Icon'

const directory = {
  history: {
    name: 'Previous Earthquakes',
    icon: Icon.Time(),
    content: History
  },
  location: {
    name: 'Location and Range',
    icon: Icon.Globe(),
    content: Location
  },
  settings: {
    name: 'Settings and Privacy',
    icon: Icon.Settings(),
    content: Settings
  }
}

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
  const onClick = ({ name, content }) => {
    configuration.app.toggleContent({
      name,
      onClose: () => { configuration.app.toggleContent(null) },
      Content: content,
      props: { configuration, engine, earthquake }
    })
  }

  return (
    <div className='left-control shadow-lg'>
      <div className='container-fluid px-0'>
        <ButtonControl icon={directory.history.icon} onClick={() => { onClick(directory.history) }} />
        <ButtonControl icon={directory.location.icon} onClick={() => { onClick(directory.location) }} />
        <ButtonControl icon={directory.settings.icon} onClick={() => { onClick(directory.settings) }} />
      </div>
    </div>
  )
}

const ButtonControl = ({ icon, onClick }) => {
  return (
    <div className='row g-0'>
      <div className='col-auto mx-2 my-2'>
        <div className='button-svg button-svg-color-transparent' onClick={onClick}>{icon}</div>
      </div>
    </div>
  )
}

export default Control
