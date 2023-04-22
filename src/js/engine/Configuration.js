/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Data from '../utilities/Data'

export default class Configuration {
  constructor ({ app, engine, map }) {
    this.app = app
    this.engine = engine
    this.map = map
  }

  getLocation () {
    return Data.Location.find((location) => location.name === this.engine.location)
  }

  getAppTheme () {
    return Data.AppTheme.find((appTheme) => appTheme.name === this.app.theme)
  }

  getMapTheme () {
    return Data.MapTheme.find((mapTheme) => mapTheme.name === this.map.theme)
  }

  setAppTheme (appTheme) {
    if (appTheme) this.app.theme = appTheme
    const { className, color } = this.getAppTheme()
    const app = document.getElementById('app')
    const element = document.querySelector('meta[name="theme-color"]')
    if (app) app.className = className
    if (element) element.setAttribute('content', color)
  }
}
