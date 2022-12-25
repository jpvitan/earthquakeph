/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

export default class Configuration {
  constructor(squareAreaValue, minMagnitude, maxMagnitude, plot, updateInterval, theme, mapTheme) {
    this.squareAreaValue = squareAreaValue
    this.minMagnitude = minMagnitude
    this.maxMagnitude = maxMagnitude
    this.plot = plot
    this.updateInterval = updateInterval
    this.theme = theme
    this.mapTheme = mapTheme
  }

  setTheme (theme) {
    this.theme = theme
    const app = document.getElementById('app')
    if (app) {
      app.className = theme
    }
  }
}
