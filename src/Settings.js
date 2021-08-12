/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2020 Justine Paul Sanchez Vitan. All rights reserved.
*/

import Overlay from "./Overlay"
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { earthquake } from "./DataHandler";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const Settings = () => {
    const [minMagnitude, setMinMagnitude] = useState(earthquake.minMagnitude);
    const [maxMagnitude, setMaxMagnitude] = useState(earthquake.maxMagnitude);

    useEffect(() => {
        document.getElementById('location').value = earthquake.square_area_value;
        document.getElementById('min_magnitude').value = minMagnitude;
        document.getElementById('max_magnitude').value = maxMagnitude;
    }, []);

    var minMagnitudeArray = [];
    var maxMagnitudeArray = [];

    var minMagnitudeInt = parseInt(minMagnitude);
    var maxMagnitudeInt = parseInt(maxMagnitude);

    for (var i = 1; i <= maxMagnitudeInt - 1; i++) {
        minMagnitudeArray.push(i);
    }
    for (var j = minMagnitudeInt + 1; j <= 10; j++) {
        maxMagnitudeArray.push(j);
    }

    earthquake.minMagnitude = minMagnitudeInt;
    earthquake.maxMagnitude = maxMagnitudeInt;

    return <div className='settings-container'>
        <div className='settings-text-container text-center'>
            <h1>Settings</h1>
            <h3 className='mt-4 mb-3'>Location</h3>
            <select id='location' className="form-select mx-auto" onChange={() => {
                earthquake.square_area_value = document.getElementById('location').value;
            }}>
                <option value="0">Philippines</option>
                <option value="1">Indonesia</option>
                <option value="2">Japan</option>
                <option value="3">World</option>
            </select>
            <h3 className='mt-4 mb-3'>Minimum Magnitude</h3>
            <select id='min_magnitude' className="form-select mx-auto" onChange={() => {
                setMinMagnitude(document.getElementById('min_magnitude').value);
            }}>
                {minMagnitudeArray.map((value) => { return <option key={value} value={value}>{value}</option> })}
            </select>
            <h3 className='mt-4 mb-3'>Maximum Magnitude</h3>
            <select id='max_magnitude' className="form-select mx-auto" onChange={() => {
                setMaxMagnitude(document.getElementById('max_magnitude').value);
            }}>
                {maxMagnitudeArray.map((value) => { return <option key={value} value={value}>{value}</option> })}
            </select>
        </div>
        <Link to='/' className='back-to-map-button btn btn-primary rounded-pill'>Back to Map</Link>
        <Overlay />
    </div>;
}

export default Settings;
