import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { earthquake, fetchData } from './DataHandler';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoianB2aXRhbiIsImEiOiJja25ncDA5anEwOGpnMnFwa3gzbzF3MDVmIn0.NZhLXKy5MrDWKbnS8-BH3w';

const Map = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(121.7740);
    const [lat, setLat] = useState(12.8797);
    const [zoom, setZoom] = useState(5.5);

    useEffect(() => {
        const fetchDataCycle = () => {
            fetchData();
            setTimeout(fetchDataCycle, 5000);
        }
        const update = () => {
            if (earthquake.update) {
                setLng(earthquake.longitude);
                setLat(earthquake.latitude);
            }
            setTimeout(update, 1000);
        }

        fetchDataCycle();
        update();
    }, []);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/darkaxe201/ckh6jgtjn1avt19k61miwxosx',
            center: [lng, lat],
            zoom: zoom,
            minZoom: 5.5
        });

        map.on('load', () => {
            if (lng !== 121.7740 && lat !== 12.8797) {
                map.addSource('circleData', {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [lng, lat]
                            }
                        }]
                    }
                });
                map.addLayer({
                    id: 'data',
                    type: 'circle',
                    source: 'circleData',
                    paint: {
                        'circle-color': 'transparent',
                        'circle-radius': 50,
                        'circle-stroke-color': '#e74c3c',
                        'circle-stroke-width': 3
                    },
                });

                map.flyTo({
                    center: [lng, lat],
                    zoom: 9
                });

                var el = document.createElement('div');
                el.className = 'cross';

                var marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
            }
        });

        return () => map.remove();
    }, [lng, lat]);

    return (
        <div className="map-container" ref={mapContainer} />
    );
};

export default Map;
