/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

export default class DataCycle {
  constructor(configuration, onUpdate, onError, onStatusChange) {
    this.configuration = configuration
    this.onUpdate = onUpdate
    this.onError = onError
    this.onStatusChange = onStatusChange
    this.startCycle = false
    this.previousEarthquake = null
  }

  setOnUpdate (onUpdate) {
    this.onUpdate = onUpdate
  }

  setOnError (onError) {
    this.onError = onError
  }

  setOnStatusChange (onStatusChange) {
    this.onStatusChange = onStatusChange
  }

  start () {
    if (this.startCycle) return

    this.startCycle = true
    let counter = 0

    const cycle = () => {
      if (!this.startCycle) return
      if (counter++ % this.configuration.interval === 0) this.update()
      setTimeout(cycle, 1000)
    }
    cycle()
  }

  stop () {
    this.startCycle = false
  }

  async update (forcedUpdate = false) {
    const earthquake = { list: [] }

    let response

    typeof this.onStatusChange === 'function' && this.onStatusChange('fetching')

    try {
      response = await fetch(url)
    } catch (error) {
      typeof this.onError === 'function' && this.onError({ type: 'Network Error', details: 'The app encountered some problems while communicating with the USGS server.' })
      typeof this.onStatusChange === 'function' && this.onStatusChange('error')
      return
    }

    if (!response.ok) {
      typeof this.onError === 'function' && this.onError({ type: 'Server Response Error', details: 'The app encountered some problems while communicating with the USGS server.' })
      typeof this.onStatusChange === 'function' && this.onStatusChange('error')
      return
    }

    const data = await response.json()
    const features = data.features

    const area = this.configuration.getLocation().area

    const latL = area[0]
    const latR = area[1]
    const longL = area[2]
    const longR = area[3]

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

    typeof this.onUpdate === 'function' && this.onUpdate(this.previousEarthquake, earthquake, forcedUpdate)
    typeof this.onStatusChange === 'function' && this.onStatusChange('success')
    this.previousEarthquake = earthquake
  }
}
