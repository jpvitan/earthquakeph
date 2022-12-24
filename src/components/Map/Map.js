/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Utility from '../../utility/Utility'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import './Map.scss'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = ({ earthquake }) => {
  const { latitude, longitude, list } = earthquake

  const mapContainer = useRef()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: Utility.configuration.mapTheme,
      center: [longitude, latitude],
      zoom: 5.5,
      minZoom: 4
    })

    Utility.map.setCoordinates = (longitude, latitude, zoom) => map.flyTo({ center: [longitude, latitude], zoom })

    map.on('load', () => {
      map.flyTo({
        center: [longitude, latitude],
        zoom: 7
      })

      const el = document.createElement('div')
      el.className = 'cross'
      el.setAttribute('role', 'img')
      new mapboxgl.Marker(el).setLngLat([longitude, latitude]).addTo(map)

      const listPlot = [...list]
      listPlot.splice(0, 1)
      listPlot.map((earthquake) => {
        new mapboxgl.Marker(Utility.createMagnitudeCircle(earthquake)).setLngLat([earthquake.longitude, earthquake.latitude]).addTo(map)
        if (earthquake.magnitude >= 6) {
          const radius = document.createElement('div')
          radius.className = 'radius'
          new mapboxgl.Marker(radius).setLngLat([earthquake.longitude, earthquake.latitude]).addTo(map)
        }
        return () => { }
      })
    })
    return () => map.remove()
  })

  return (
    <div className='map' ref={mapContainer} />
  )
}

export default Map
