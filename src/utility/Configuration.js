/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Location from '../data/Location'
import AppTheme from '../data/AppTheme'
import MapTheme from '../data/MapTheme'

export default class Configuration {
  constructor (location, minMagnitude, maxMagnitude, plot, interval, appTheme, mapTheme) {
    this.location = location
    this.minMagnitude = minMagnitude
    this.maxMagnitude = maxMagnitude
    this.plot = plot
    this.interval = interval
    this.appTheme = appTheme
    this.mapTheme = mapTheme
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
