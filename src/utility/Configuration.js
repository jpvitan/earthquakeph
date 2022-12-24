/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

export default class Configuration {
  constructor(minMagnitude, maxMagnitude, plot, squareAreaValue, updateInterval, mapTheme, theme) {
    this.minMagnitude = minMagnitude
    this.maxMagnitude = maxMagnitude
    this.plot = plot
    this.squareAreaValue = squareAreaValue
    this.updateInterval = updateInterval
    this.mapTheme = mapTheme
    this.theme = theme
  }
}
