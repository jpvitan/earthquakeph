/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
const coordinatesByValue = [[4, 21, 116, 129], [-90, 90, -180, 180]]

export default class DataCycle {
  constructor(configuration, onUpdate, onError) {
    this.configuration = configuration
    this.onUpdate = onUpdate
    this.onError = onError
    this.startCycle = false
  }

  start () {
    if (this.startCycle) return

    this.startCycle = true
    let counter = 0

    const cycle = () => {
      if (!this.startCycle) return
      if (counter++ % this.configuration.updateInterval === 0) this.update()
      setTimeout(cycle, 1000)
    }
    cycle()
  }

  stop () {
    this.startCycle = false
  }

  async update () {
    const earthquake = { list: [] }

    let response

    try {
      response = await fetch(url)
    } catch (error) {
      this.onError({ type: 'Network Error', details: 'The app encountered some problems while communicating with the USGS server.' })
      return
    }

    if (!response.ok) {
      this.onError({ type: 'Server Response Error', details: 'The app encountered some problems while communicating with the USGS server.' })
      return
    }

    const data = await response.json()
    const features = data.features

    const latL = coordinatesByValue[this.configuration.squareAreaValue][0]
    const latR = coordinatesByValue[this.configuration.squareAreaValue][1]
    const longL = coordinatesByValue[this.configuration.squareAreaValue][2]
    const longR = coordinatesByValue[this.configuration.squareAreaValue][3]

    for (let i = 0; i < features.length; i++) {
      const properties = features[i].properties
      const geometry = features[i].geometry
      const latitude = geometry.coordinates[1].toFixed(4)
      const longitude = geometry.coordinates[0].toFixed(4)

      if (latitude >= latL && latitude <= latR && longitude >= longL && longitude <= longR) {
        if (properties.mag == null) continue
        const magnitude = properties.mag
        if (!(magnitude >= this.configuration.minMagnitude && magnitude <= this.configuration.maxMagnitude)) continue
        earthquake.list.push({ id: features[i].id, location: properties.place, latitude, longitude, depth: geometry.coordinates[2].toFixed(0), time: properties.time, magnitude, tsunami: properties.tsunami })
      }

      if (earthquake.list.length >= this.configuration.plot) break
    }

    if (earthquake.list.length !== 0) {
      earthquake.id = earthquake.list[0].id
      earthquake.location = earthquake.list[0].location
      earthquake.latitude = earthquake.list[0].latitude
      earthquake.longitude = earthquake.list[0].longitude
      earthquake.depth = earthquake.list[0].depth
      earthquake.time = earthquake.list[0].time
      earthquake.magnitude = earthquake.list[0].magnitude
      earthquake.tsunami = earthquake.list[0].tsunami
    }
    this.onUpdate(earthquake)
  }
}