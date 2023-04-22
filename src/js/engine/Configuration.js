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
    this.action = {}

    this.app.getTheme = () => Data.AppTheme.find((theme) => theme.name === this.app.theme)
    this.engine.getLocation = () => Data.Location.find((location) => location.name === this.engine.location)
    this.map.getTheme = () => Data.MapTheme.find((theme) => theme.name === this.map.theme)

    this.app.setTheme = (theme) => {
      if (theme) this.app.theme = theme
      const { className, color } = this.app.getTheme()
      const app = document.getElementById('app')
      const element = document.querySelector('meta[name="theme-color"]')
      if (app) app.className = className
      if (element) element.setAttribute('content', color)
    }
  }
}
