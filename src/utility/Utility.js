/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Configuration from './Configuration'
import DataCycle from './DataCycle'

export default class Utility {
  static configuration = new Configuration(1, 1, 10, 30, 180, 'theme-black-pearl', 'mapbox://styles/jpvitan/ckwjznqa44qhz14qnswqs0koo')
  static dataCycle = new DataCycle(this.configuration)
  static display = { toggleLoadingVisibility: () => { }, toggleMessageScreen: () => { }, setIndicatorColor: () => { } }
  static map = { setCoordinates: () => { } }

  static cycleTheme () {
    const themes = this.getThemes()
    let index = themes.findIndex((theme) => theme === this.configuration.theme)
    index++
    if (index > themes.length - 1) index = 0
    this.configuration.setTheme(themes[index])
  }

  static getThemes () {
    return ['theme-black-pearl', 'theme-deep-black', 'theme-shadowed-steel', 'theme-total-eclipse']
  }

  static getStatusColor (status) {
    let statusColor = '#95a5a6'

    if (status === 'success') {
      statusColor = '#2ecc71'
    } else if (status === 'fetching') {
      statusColor = '#f39c12'
    } else if (status === 'error') {
      statusColor = '#e74c3c'
    }

    return statusColor
  }

  static getMagnitudeColor (magnitude) {
    let magnitudeColor = '#e74c3c'

    if (magnitude >= 1 && magnitude <= 3.9) {
      magnitudeColor = '#7f8c8d'
    } else if (magnitude >= 4 && magnitude <= 4.9) {
      magnitudeColor = '#f1c40f'
    } else if (magnitude >= 5 && magnitude <= 5.9) {
      magnitudeColor = '#f39c12'
    } else if (magnitude >= 6 && magnitude <= 6.9) {
      magnitudeColor = '#d35400'
    } else if (magnitude >= 7 && magnitude <= 7.9) {
      magnitudeColor = '#c0392b'
    } else if (magnitude >= 8) {
      magnitudeColor = '#9b59b6'
    }

    return magnitudeColor
  }

  static getMagnitudeArrayBounds (minMagnitude, maxMagnitude) {
    const minMagnitudeArray = []
    const maxMagnitudeArray = []

    for (let i = 1; i <= maxMagnitude - 1; i++) {
      minMagnitudeArray.push(i)
    }
    for (let j = minMagnitude + 1; j <= 10; j++) {
      maxMagnitudeArray.push(j)
    }

    return [minMagnitudeArray, maxMagnitudeArray]
  }

  static createMagnitudeCircle (earthquake) {
    const magnitudeCircle = document.createElement('div')

    magnitudeCircle.id = 'magnitude-circle-' + earthquake.id
    magnitudeCircle.className = 'magnitude-circle'
    magnitudeCircle.style.backgroundColor = this.getMagnitudeColor(earthquake.magnitude)
    magnitudeCircle.innerHTML = '<div>' + Math.floor(earthquake.magnitude) + '</div>'

    return magnitudeCircle
  }
}
