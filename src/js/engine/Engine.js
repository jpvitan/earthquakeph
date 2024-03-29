/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Color from '../utilities/Color'

export default class Engine {
  constructor (configuration) {
    this.configuration = configuration
    this.onUpdate = []
    this.onError = []
    this.onStatusChange = []
    this.startCycle = false
    this.updateCount = 0
    this.features = null
    this.previous = null
  }

  setOnUpdate (onUpdate) {
    this.onUpdate.push(onUpdate)
  }

  setOnError (onError) {
    this.onError.push(onError)
  }

  setOnStatusChange (onStatusChange) {
    const id = Math.random().toString(36).substring(2, 9)
    this.onStatusChange.push({ id, onStatusChange })
    return id
  }

  unsubscribeOnStatusChange (unsubscribeId) {
    this.onStatusChange = this.onStatusChange.filter(({ id }) => id !== unsubscribeId)
  }

  start () {
    if (this.startCycle) return

    this.startCycle = true
    let counter = 0

    const cycle = () => {
      if (!this.startCycle) return
      if (counter++ % this.configuration.interval === 0 && !this.configuration.pause) this.update()
      setTimeout(cycle, 1000)
    }
    cycle()
  }

  stop () {
    this.startCycle = false
  }

  async update (options) {
    const defaults = {
      forced: false,
      recycle: false,
      callback: null
    }

    options = { ...defaults, ...options }

    const { forced, recycle, callback } = options

    const earthquake = {
      list: [],
      statistics: {
        magnitude: [0, 0, 0, 0, 0, 0],
        depth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }

    if (!recycle) {
      this.onStatusChange.forEach(({ onStatusChange }) => { typeof onStatusChange === 'function' && onStatusChange('fetching') })

      const url = this.updateCount === 0 ? this.configuration.source : this.configuration.auxiliary
      let response

      try {
        response = await fetch(url)
      } catch (error) {
        this.onError.forEach(onError => { typeof onError === 'function' && onError({ type: 'Network Error', details: 'The app encountered some problems while communicating with the USGS server.' }) })
        this.onStatusChange.forEach(({ onStatusChange }) => { typeof onStatusChange === 'function' && onStatusChange('error') })
        return
      }

      if (!response.ok) {
        this.onError.forEach(onError => { typeof onError === 'function' && onError({ type: 'Server Response Error', details: 'The app encountered some problems while communicating with the USGS server.' }) })
        this.onStatusChange.forEach(({ onStatusChange }) => { typeof onStatusChange === 'function' && onStatusChange('error') })
        return
      }

      const data = await response.json()
      this.features = data.features
    }

    const area = this.configuration.location.area

    const latL = area[0]
    const latR = area[1]
    const longL = area[2]
    const longR = area[3]

    for (let i = 0; i < this.features.length; i++) {
      const properties = this.features[i].properties
      const geometry = this.features[i].geometry
      const latitude = geometry.coordinates[1].toFixed(4)
      const longitude = geometry.coordinates[0].toFixed(4)

      if (latitude >= latL && latitude <= latR && longitude >= longL && longitude <= longR) {
        if (properties.mag == null) continue
        const magnitude = properties.mag
        const depth = geometry.coordinates[2].toFixed(0)
        if (!(magnitude >= this.configuration.minMagnitude && magnitude <= this.configuration.maxMagnitude)) continue

        earthquake.list.push({
          id: this.features[i].id,
          status: properties.status,
          location: properties.place,
          latitude,
          longitude,
          depth,
          time: new Date(properties.time),
          magnitude,
          magnitudeType: properties.magType,
          tsunami: properties.tsunami,
          color: Color.Magnitude(magnitude)
        })

        earthquake.statistics.magnitude[Math.max(3, Math.min(8, Math.floor(magnitude))) - 3]++
        earthquake.statistics.depth[Math.min(10, Math.floor(depth / 10))]++
      }

      if (earthquake.list.length >= this.configuration.plot) break
    }

    if (earthquake.list.length !== 0) {
      earthquake.id = earthquake.list[0].id
      earthquake.status = earthquake.list[0].status
      earthquake.location = earthquake.list[0].location
      earthquake.latitude = earthquake.list[0].latitude
      earthquake.longitude = earthquake.list[0].longitude
      earthquake.depth = earthquake.list[0].depth
      earthquake.time = earthquake.list[0].time
      earthquake.magnitude = earthquake.list[0].magnitude
      earthquake.magnitudeType = earthquake.list[0].magnitudeType
      earthquake.tsunami = earthquake.list[0].tsunami
      earthquake.color = earthquake.list[0].color
      earthquake.updateCount = this.updateCount
    }

    if (callback) callback(earthquake)

    this.onUpdate.forEach(onUpdate => { typeof onUpdate === 'function' && onUpdate({ previous: this.previous, current: earthquake, forced }) })
    this.onStatusChange.forEach(({ onStatusChange }) => { typeof onStatusChange === 'function' && onStatusChange('success') })
    this.updateCount++
    this.previous = earthquake
  }
}
