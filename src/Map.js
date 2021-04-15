import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoianB2aXRhbiIsImEiOiJja25ncDA5anEwOGpnMnFwa3gzbzF3MDVmIn0.NZhLXKy5MrDWKbnS8-BH3w';

const Map = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(121.7740);
    const [lat, setLat] = useState(12.8797);
    const [zoom, setZoom] = useState(5.5);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/darkaxe201/ckh6jgtjn1avt19k61miwxosx',
            center: [lng, lat],
            zoom: zoom
        });
        return () => map.remove();
    }, []);

    return (
        <div className="map-container" ref={mapContainer} />
    );
};

export default Map;
