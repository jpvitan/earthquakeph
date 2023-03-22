/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = ({ configuration, engine, earthquake }) => {
  const mapContainer = useRef()

  useEffect(() => {
    const { latitude, longitude, list } = earthquake
    const map = new mapboxgl.Map({ container: mapContainer.current, style: configuration.getMapTheme().url, center: [longitude, latitude], zoom: 5.5, minZoom: 3 })

    map.on('load', () => {
      /* Fly */
      map.flyTo({ center: [longitude, latitude], zoom: configuration.zoom })

      /* Cross */
      const cross = document.createElement('img')
      cross.setAttribute('src', require('../../assets/images/cross.png'))
      cross.setAttribute('width', 20)
      cross.setAttribute('height', 20)
      new mapboxgl.Marker(cross).setLngLat([longitude, latitude]).addTo(map)

      /* Plot */
      list.slice(1).forEach((earthquake) => {
        const figure = document.createElement('p')
        figure.setAttribute('class', 'text-size-lg fw-bold text-light mb-0')
        figure.innerText = earthquake.magnitude.toFixed(0)

        const plot = document.createElement('div')
        plot.setAttribute('id', `indicator-plot-${earthquake.id}`)
        plot.setAttribute('class', 'indicator-plot d-flex justify-content-center align-items-center')
        plot.style.backgroundColor = earthquake.color
        plot.append(figure)
        new mapboxgl.Marker(plot).setLngLat([earthquake.longitude, earthquake.latitude]).addTo(map)

        if (earthquake.magnitude >= 6) {
          const radius = document.createElement('div')
          radius.classList.add('indicator-radius')
          new mapboxgl.Marker(radius).setLngLat([earthquake.longitude, earthquake.latitude]).addTo(map)
        }
      })

      /* Area */
      if (configuration.showBoundingBox && configuration.location !== 'World') {
        const area = configuration.getLocation().area
        const geometry = { type: 'Polygon', coordinates: [[[area[2], area[1]], [area[3], area[1]], [area[3], area[0]], [area[2], area[0]], [area[2], area[1]]]] }
        map.addSource('area', { type: 'geojson', data: { type: 'Feature', geometry } })
        map.addLayer({ id: 'area', type: 'line', source: 'area', layout: {}, paint: { 'line-color': '#fff', 'line-width': 1 } })
      }
    })
    return () => map.remove()
  }, [configuration, engine, earthquake])

  return (<div className='map' ref={mapContainer} />)
}

export default Map
