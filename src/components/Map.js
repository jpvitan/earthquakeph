/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

/*
============================================================
Imports
============================================================
*/
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import { earthquake, earthquakeList, fetchData } from '../api/DataHandler'
import { getMagnitudeColor } from '../Utility'
import React, { useState, useEffect, useRef } from 'react'

import './Map.css'

/*
============================================================
Variables
============================================================
*/
mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = 'pk.eyJ1IjoianB2aXRhbiIsImEiOiJja25ncDA5anEwOGpnMnFwa3gzbzF3MDVmIn0.NZhLXKy5MrDWKbnS8-BH3w'

/*
============================================================
Functions
============================================================
*/
const Map = () => {
  const mapContainer = useRef()
  const [lng, setLng] = useState(121.7740)
  const [lat, setLat] = useState(12.8797)
  const [plot, setPlot] = useState(earthquake.plot)
  const [theme, setTheme] = useState(earthquake.theme)

  useEffect(() => {
    let stopUpdate = false
    let fetchDataCycleCounter = 0
    const fetchDataCycle = () => {
      if (stopUpdate) {
        return
      }
      if (fetchDataCycleCounter++ % 60 === 0) {
        fetchData(false)
      }
      setTimeout(fetchDataCycle, 1000)
    }
    const update = () => {
      if (stopUpdate) {
        return
      }
      if (earthquake.updateMap) {
        setLng(earthquake.longitude)
        setLat(earthquake.latitude)
        setPlot(earthquake.plot)
        setTheme(earthquake.theme)
        earthquake.updateMap = false
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
      style: earthquake.theme,
      center: [lng, lat],
      zoom: 5.5,
      minZoom: 5.5
    })
    map.on('load', () => {
      if (earthquake.noData) {
        return
      }
      if (lng !== 121.7740 && lat !== 12.8797) {
        map.flyTo({
          center: [lng, lat],
          zoom: 7
        })
        const el = document.createElement('div')
        el.className = 'cross'
        new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)
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
            return
          }
          setTimeout(() => { updatePlot(maxNumber) }, 250)
        }
        updatePlot(earthquake.plot)
      }
    })
    return () => map.remove()
  }, [lng, lat, plot, theme])

  return (
    <div className='map' ref={mapContainer} />
  )
}

export default Map
