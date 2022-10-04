/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { earthquake, cycle } from '../api/DataHandler'
import { configuration } from '../pages/Settings'
import { getMagnitudeColor } from '../utility/Utility'
import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import './Map.css'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

export let updateMap = () => { }

const Map = () => {
  const mapContainer = useRef()
  const [lng, setLng] = useState(121.7740)
  const [lat, setLat] = useState(12.8797)
  const [plot, setPlot] = useState(configuration.plot)
  const [theme, setTheme] = useState(configuration.theme)
  const [updateInterval, setUpdateInterval] = useState(configuration.updateInterval)

  useEffect(() => {
    updateMap = () => {
      setLng(earthquake.longitude)
      setLat(earthquake.latitude)
      setPlot(configuration.plot)
      setTheme(configuration.theme)
      setUpdateInterval(configuration.updateInterval)
    }
  }, [])

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: configuration.theme,
      center: [lng, lat],
      zoom: 5.5,
      minZoom: 4
    })
    map.on('load', () => {
      if (cycle.noData) {
        return
      }
      if (lng !== 121.7740 && lat !== 12.8797) {
        map.flyTo({
          center: [lng, lat],
          zoom: 7
        })

        const el = document.createElement('div')
        el.className = 'cross'
        el.setAttribute('role', 'img')
        new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)

        const listPlot = [...earthquake.list]
        listPlot.splice(0, 1)
        listPlot.map((earthquake) => {
          const magnitudeCircle = document.createElement('div')
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
      }
    })
    return () => map.remove()
  }, [lng, lat, plot, theme, updateInterval])

  return (
    <div className='map' ref={mapContainer} />
  )
}

export default Map
