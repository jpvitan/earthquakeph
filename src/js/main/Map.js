/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Utility from '../utilities/Utility'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = ({ earthquake }) => {
  const { latitude, longitude, list } = earthquake

  const mapContainer = useRef()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: Utility.configuration.getMapTheme().url,
      center: [longitude, latitude],
      zoom: 5.5,
      minZoom: 3
    })

    Utility.map.setCoordinates = (longitude, latitude, zoom) => map.flyTo({ center: [longitude, latitude], zoom })

    map.on('load', () => {
      /* Fly */
      map.flyTo({
        center: [longitude, latitude],
        zoom: Utility.configuration.zoom
      })

      /* Cross */
      const el = document.createElement('div')
      el.className = 'indicator-cross'
      el.setAttribute('role', 'img')
      new mapboxgl.Marker(el).setLngLat([longitude, latitude]).addTo(map)

      /* Plot */
      const listPlot = [...list]
      listPlot.splice(0, 1)
      listPlot.map((earthquake) => {
        new mapboxgl.Marker(Utility.magnitude.createCircle(earthquake)).setLngLat([earthquake.longitude, earthquake.latitude]).addTo(map)
        if (earthquake.magnitude >= 6) {
          const radius = document.createElement('div')
          radius.className = 'indicator-radius'
          new mapboxgl.Marker(radius).setLngLat([earthquake.longitude, earthquake.latitude]).addTo(map)
        }
        return () => { }
      })

      /* Area */
      if (Utility.configuration.showBoundingBox && Utility.configuration.location !== 'World') {
        const area = Utility.configuration.getLocation().area
        const geometry = {
          type: 'Polygon',
          coordinates: [[
            [area[2], area[1]],
            [area[3], area[1]],
            [area[3], area[0]],
            [area[2], area[0]],
            [area[2], area[1]]
          ]]
        }
        map.addSource('area', { type: 'geojson', data: { type: 'Feature', geometry } })
        map.addLayer({ id: 'area', type: 'line', source: 'area', layout: {}, paint: { 'line-color': '#fff', 'line-width': 1 } })
      }
    })
    return () => map.remove()
  })

  return (
    <div className='map' ref={mapContainer} />
  )
}

export default Map
