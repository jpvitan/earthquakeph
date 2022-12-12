/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { toggleMessageScreen } from '../App'
import { setFetchIndicatorColor } from '../components/Earthquake'
import { updateMap } from '../components/Map'
import { configuration } from '../pages/Settings'

const coordinatesByValue = [[4, 21, 116, 129], [-90, 90, -180, 180]]

export const earthquake = {
  id: '',
  location: '-',
  latitude: 0.0,
  longitude: 0.0,
  depth: 0.0,
  time: 0,
  magnitude: 0.0,
  tsunami: '',
  list: []
}

export const cycle = {
  noData: false
}

export const fetchData = async (updateEarthquake) => {
  setFetchIndicatorColor('#f39c12')

  earthquake.list = []

  cycle.noData = true

  const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
  let response

  try {
    response = await fetch(url)
  } catch (error) {
    toggleMessageScreen('Network Error', 'The app encountered some problems while communicating with the USGS server.')
    return
  }

  if (!response.ok) {
    toggleMessageScreen('Server Response Error', 'The app encountered some problems while communicating with the USGS server.')
    return
  }

  const data = await response.json()

  const features = data.features

  for (let i = 0; i < features.length; i++) {
    const properties = features[i].properties
    const geometry = features[i].geometry
    const latitude = geometry.coordinates[1].toFixed(4)
    const longitude = geometry.coordinates[0].toFixed(4)

    const latL = coordinatesByValue[configuration.squareAreaValue][0]
    const latR = coordinatesByValue[configuration.squareAreaValue][1]
    const longL = coordinatesByValue[configuration.squareAreaValue][2]
    const longR = coordinatesByValue[configuration.squareAreaValue][3]

    if (latitude >= latL && latitude <= latR && longitude >= longL && longitude <= longR) {
      if (properties.mag == null) {
        continue
      }

      const magnitude = properties.mag

      if (!(magnitude >= configuration.minMagnitude && magnitude <= configuration.maxMagnitude)) {
        continue
      }

      earthquake.list.push({ id: features[i].id, location: properties.place, latitude, longitude, depth: geometry.coordinates[2].toFixed(0), time: properties.time, magnitude, tsunami: properties.tsunami })
    }

    if (earthquake.list.length >= configuration.plot) break
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
    cycle.noData = false
    setFetchIndicatorColor('#2ecc71')
  } else {
    setFetchIndicatorColor('#95a5a6')
  }

  updateMap()
  updateEarthquake(earthquake)
}
