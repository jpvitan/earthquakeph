/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2020 Justine Paul Sanchez Vitan. All rights reserved.
*/

import Overlay from "./Overlay"
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { earthquake } from "./DataHandler";
import { useEffect } from "react";

const Settings = () => {
    useEffect(() => {
        document.getElementById('location').value = earthquake.square_area_value;
    }, []);

    return <div className='settings-container'>
        <div className='settings-text-container text-center'>
            <h1>Settings</h1>
            <h3 className='mt-4 mb-3'>Location</h3>
            <select id='location' className="form-select mx-auto" onChange={() => {
                earthquake.square_area_value = document.getElementById('location').value;
            }}>
                <option value="0">Philippines</option>
                <option value="1">World</option>
            </select>
        </div>
        <Overlay />
    </div>;
}

export default Settings;