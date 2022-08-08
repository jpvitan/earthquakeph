/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { toggleLoadingVisibility } from '../App'
import { earthquake, cycle, earthquakeList, fetchData } from '../api/DataHandler'
import { configuration } from '../pages/Settings'
import { getMagnitudeColor } from '../utility/Utility'
import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import './Map.css'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = () => {
  const mapContainer = useRef()
  const [lng, setLng] = useState(121.7740)
  const [lat, setLat] = useState(12.8797)
  const [plot, setPlot] = useState(configuration.plot)
  const [theme, setTheme] = useState(configuration.theme)
  const [updateInterval, setUpdateInterval] = useState(configuration.updateInterval)

  useEffect(() => {
    let stopUpdate = false
    let fetchDataCycleCounter = 0
    const fetchDataCycle = () => {
      if (stopUpdate) {
        return
      }
      if (fetchDataCycleCounter++ % configuration.updateInterval === 0) {
        fetchData(false)
      }
      setTimeout(fetchDataCycle, 1000)
    }
    const update = () => {
      if (stopUpdate) {
        return
      }
      if (cycle.updateMap) {
        setLng(earthquake.longitude)
        setLat(earthquake.latitude)
        setPlot(configuration.plot)
        setTheme(configuration.theme)
        setUpdateInterval(configuration.updateInterval)
        cycle.updateMap = false
      }
      setTimeout(update, 1000)
    }
    fetchDataCycle()
    update()
    return () => {
      stopUpdate = true
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
        fetchData(true)
        const updatePlot = (maxNumber) => {
          if (earthquakeList.length !== 0) {
            const spliceLength = earthquakeList.length - maxNumber - 1
            earthquakeList.splice(maxNumber, spliceLength)
            earthquakeList.splice(0, 1)
            earthquakeList.map((earthquake) => {
              const el = document.createElement('div')
              el.className = 'magnitude-circle'
              el.style.backgroundColor = getMagnitudeColor(earthquake.magnitude)
              el.innerHTML = '<div>' + Math.floor(earthquake.magnitude) + '</div>'
              new mapboxgl.Marker(el).setLngLat([earthquake.longitude, earthquake.latitude]).addTo(map)
              return () => { }
            })
            earthquakeList.splice(0, earthquakeList.length)

            toggleLoadingVisibility(false)
            map.flyTo({
              center: [lng, lat],
              zoom: 7
            })
            const el = document.createElement('div')
            el.className = 'cross'
            new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)

            return
          }
          setTimeout(() => { updatePlot(maxNumber) }, 250)
        }
        updatePlot(configuration.plot)
      }
    })
    return () => map.remove()
  }, [lng, lat, plot, theme, updateInterval])

  return (
    <div className='map' ref={mapContainer} />
  )
}

export default Map
