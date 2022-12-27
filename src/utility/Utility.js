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
  /* Configuration */
  static configuration = new Configuration('Philippines', 1, 10, 30, 180, 'Black Pearl', 'Dark')
  /* DataCycle */
  static dataCycle = new DataCycle(this.configuration)

  /* Display */
  static display = {
    toggleLoadingVisibility: () => {

    },
    toggleMessageScreen: () => {

    },
    setIndicatorColor: () => {

    },
    setWebsiteTint: (color) => {
      const element = document.querySelector('meta[name="theme-color"]')
      if (element) element.setAttribute('content', color)
    }
  }

  /* Map */
  static map = { setCoordinates: () => { } }

  /* Status */
  static status = {
    getColor: (status) => {
      let color = '#95a5a6'
      if (status === 'success') color = '#2ecc71'
      else if (status === 'fetching') color = '#f39c12'
      else if (status === 'error') color = '#e74c3c'
      return color
    }
  }

  /* Magnitude */
  static magnitude = {
    getColor: (magnitude) => {
      let color = '#e74c3c'
      if (magnitude >= 1 && magnitude <= 3.9) color = '#7f8c8d'
      else if (magnitude >= 4 && magnitude <= 4.9) color = '#f1c40f'
      else if (magnitude >= 5 && magnitude <= 5.9) color = '#f39c12'
      else if (magnitude >= 6 && magnitude <= 6.9) color = '#d35400'
      else if (magnitude >= 7 && magnitude <= 7.9) color = '#c0392b'
      else if (magnitude >= 8) color = '#9b59b6'
      return color
    },
    createCircle: (earthquake) => {
      const circle = document.createElement('div')
      circle.id = `magnitude-circle-${earthquake.id}`
      circle.className = 'magnitude-circle'
      circle.style.backgroundColor = this.getMagnitudeColor(earthquake.magnitude)
      circle.innerHTML = `<div>${Math.floor(earthquake.magnitude)}</div>`
      return circle
    }
  }
}
