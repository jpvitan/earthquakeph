/*
============================================================
earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.
============================================================
*/

const coordinatesByValue = [[4, 21, 116, 129], [-10, 8, 94, 142], [28, 46, 128, 146], [-89, 89, -179, 179]]

export const earthquake = {
  firstFetch: true,
  update: false,
  updateMap: false,
  id: '',
  location: '-',
  latitude: 0.0,
  longitude: 0.0,
  depth: 0.0,
  time: 0,
  magnitude: 0.0,
  tsunami: '',
  count: 0,
  square_area_value: 0,
  minMagnitude: 1,
  maxMagnitude: 10,
  plot: 10,
  theme: 'mapbox://styles/jpvitan/ckwjznqa44qhz14qnswqs0koo',
  noData: false
}

export let earthquakeList = []

export const fetchData = (list) => {
  const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

  if (list) {
    earthquakeList = []
  } else if (earthquake.firstFetch) {
    earthquake.firstFetch = false
    earthquake.noData = false
  }

  fetch(url).then((response) => { return response.json() }).then((data) => {
    const features = data.features

    if (!list) {
      earthquake.noData = true
    }

    for (let i = list ? 0 : earthquake.count; i < features.length; i++) {
      const properties = features[i].properties
      const geometry = features[i].geometry
      const latitude = geometry.coordinates[1].toFixed(4)
      const longitude = geometry.coordinates[0].toFixed(4)

      const latL = coordinatesByValue[earthquake.square_area_value][0]
      const latR = coordinatesByValue[earthquake.square_area_value][1]
      const longL = coordinatesByValue[earthquake.square_area_value][2]
      const longR = coordinatesByValue[earthquake.square_area_value][3]

      if (latitude >= latL && latitude <= latR && longitude >= longL && longitude <= longR) {
        if (properties.mag == null) {
          continue
        }

        const magnitude = properties.mag

        if (!(magnitude >= earthquake.minMagnitude && magnitude <= earthquake.maxMagnitude)) {
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
          earthquake.noData = false

          break
        }

        earthquakeList.push({ id: features[i].id, location: properties.place, latitude, longitude, depth: geometry.coordinates[2].toFixed(0), time: properties.time, magnitude, tsunami: properties.tsunami })
      }
    }
    if (!list) {
      earthquake.update = true
    }
  })
}
