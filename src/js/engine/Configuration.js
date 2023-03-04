/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Data from '../utilities/Data'

const Location = Data.Location()
const AppTheme = Data.AppTheme()
const MapTheme = Data.MapTheme()

export default class Configuration {
  constructor(location, minMagnitude, maxMagnitude, plot, interval, appTheme, mapTheme, zoom, showBoundingBox) {
    this.location = location
    this.minMagnitude = minMagnitude
    this.maxMagnitude = maxMagnitude
    this.plot = plot
    this.interval = interval
    this.appTheme = appTheme
    this.mapTheme = mapTheme
    this.zoom = zoom
    this.showBoundingBox = showBoundingBox
  }

  getLocation () {
    return Location.find((location) => location.name === this.location)
  }

  getAppTheme () {
    return AppTheme.find((appTheme) => appTheme.name === this.appTheme)
  }

  getMapTheme () {
    return MapTheme.find((mapTheme) => mapTheme.name === this.mapTheme)
  }

  setAppTheme (appTheme) {
    this.appTheme = appTheme
    const { className, color } = this.getAppTheme()
    const app = document.getElementById('app')
    const element = document.querySelector('meta[name="theme-color"]')
    if (app) app.className = className
    if (element) element.setAttribute('content', color)
  }

  setNextLocation () {
    let index = Location.findIndex((location) => location.name === this.location)
    index++
    if (index > Location.length - 1) index = 0
    this.location = Location[index].name
  }

  setNextAppTheme () {
    let index = AppTheme.findIndex((appTheme) => appTheme.name === this.appTheme)
    index++
    if (index > AppTheme.length - 1) index = 0
    this.setAppTheme(AppTheme[index].name)
  }

  setNextMapTheme () {
    let index = MapTheme.findIndex((mapTheme) => mapTheme.name === this.mapTheme)
    index++
    if (index > MapTheme.length - 1) index = 0
    this.mapTheme = MapTheme[index].name
  }
}
