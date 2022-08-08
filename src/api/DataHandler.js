/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { configuration } from "../pages/Settings"

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
  list: [],
  listHistory: []
}

export const cycle = {
  count: 0,
  firstFetch: true,
  update: false,
  updateMap: false,
  noData: false
}

export const fetchData = (list) => {
  const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

  if (list) {
    earthquake.list = []
    earthquake.listHistory = []
  } else if (cycle.firstFetch) {
    cycle.firstFetch = false
    cycle.noData = false
  }

  fetch(url).then((response) => { return response.json() }).then((data) => {
    const features = data.features

    if (!list) {
      cycle.noData = true
    }

    for (let i = list ? 0 : cycle.count; i < features.length; i++) {
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

        if (!list) {
          earthquake.id = features[i].id
          earthquake.location = properties.place
          earthquake.latitude = latitude
          earthquake.longitude = longitude
          earthquake.depth = geometry.coordinates[2].toFixed(0)
          earthquake.time = properties.time
          earthquake.magnitude = magnitude
          earthquake.tsunami = properties.tsunami

          cycle.noData = false

          break
        }

        earthquake.list.push({ id: features[i].id, location: properties.place, latitude, longitude, depth: geometry.coordinates[2].toFixed(0), time: properties.time, magnitude, tsunami: properties.tsunami })
      }
    }
    if (!list) {
      cycle.update = true
    } else {
      earthquake.listHistory = [...earthquake.list]
    }
  })
}
