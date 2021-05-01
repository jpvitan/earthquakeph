/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2020 Justine Paul Sanchez Vitan. All rights reserved.
*/

import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { earthquake, fetchData } from './DataHandler';
import './Map.css';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoianB2aXRhbiIsImEiOiJja25ncDA5anEwOGpnMnFwa3gzbzF3MDVmIn0.NZhLXKy5MrDWKbnS8-BH3w';

const Map = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(121.7740);
    const [lat, setLat] = useState(12.8797);
    const [zoom, setZoom] = useState(5.5);

    useEffect(() => {
        var stopUpdate = false;
        const fetchDataCycle = () => {
            fetchData();
            setTimeout(fetchDataCycle, 60000);
        }
        const update = () => {
            if (stopUpdate) {
                return;
            }
            if (earthquake.updateMap) {
                setLng(earthquake.longitude);
                setLat(earthquake.latitude);
                earthquake.updateMap = false;
            }
            setTimeout(update, 1000);
        }
        fetchDataCycle();
        update();

        return () => {
            stopUpdate = true;
        };
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
                map.flyTo({
                    center: [lng, lat],
                    zoom: 7
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
