/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { getMagnitudeColor } from '../utility/Utility'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import './Map.css'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

export let setCoordinates = () => { }

const Map = ({ earthquake, configuration }) => {
  const { latitude, longitude, list } = earthquake
  const { theme } = configuration

  const mapContainer = useRef()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme,
      center: [longitude, latitude],
      zoom: 5.5,
      minZoom: 4
    })

    setCoordinates = (lng, lat) => {
      map.flyTo({
        center: [lng, lat],
        zoom: 7
      })
    }

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
        const magnitudeCircle = document.createElement('div')
        magnitudeCircle.id = 'magnitude-circle-' + earthquake.id
        magnitudeCircle.className = 'magnitude-circle'
        magnitudeCircle.style.backgroundColor = getMagnitudeColor(earthquake.magnitude)
        magnitudeCircle.innerHTML = '<div>' + Math.floor(earthquake.magnitude) + '</div>'
        new mapboxgl.Marker(magnitudeCircle).setLngLat([earthquake.longitude, earthquake.latitude]).addTo(map)
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
