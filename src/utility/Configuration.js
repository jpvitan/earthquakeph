/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

export default class Configuration {
    constructor(minMagnitude, maxMagnitude, plot, theme, squareAreaValue, updateInterval) {
        this.minMagnitude = minMagnitude
        this.maxMagnitude = maxMagnitude
        this.plot = plot
        this.theme = theme
        this.squareAreaValue = squareAreaValue
        this.updateInterval = updateInterval
    }
}
