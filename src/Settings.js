/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

/*
============================================================
Imports
============================================================
*/
import { earthquake } from './DataHandler';
import { getMagnitudeArrayBounds } from './Utility';
import { CloseIcon } from './Icon'

import './Settings.css'
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
============================================================
Functions
============================================================
*/
const Settings = (closeWindowAction) => {
    var [minMagnitudeArray, maxMagnitudeArray] = getMagnitudeArrayBounds(earthquake.minMagnitude, earthquake.maxMagnitude);

    const updateMagnitudeBounds = () => {
        var minMagnitudeSelect = document.getElementById('min_magnitude');
        var maxMagnitudeSelect = document.getElementById('max_magnitude');

        var minMagnitude = minMagnitudeSelect.value;
        var maxMagnitude = maxMagnitudeSelect.value;

        var [minMagnitudeArray, maxMagnitudeArray] = getMagnitudeArrayBounds(minMagnitude, maxMagnitude);

        minMagnitudeSelect.innerHTML = '';
        maxMagnitudeSelect.innerHTML = '';

        minMagnitudeArray.forEach(value => {
            var option = document.createElement('option');
            option.key = value;
            option.value = value;
            option.innerHTML = value;
            minMagnitudeSelect.appendChild(option);
        });
        maxMagnitudeArray.forEach(value => {
            var option = document.createElement('option');
            option.key = value;
            option.value = value;
            option.innerHTML = value;
            maxMagnitudeSelect.appendChild(option);
        });

        minMagnitudeSelect.value = minMagnitude;
        maxMagnitudeSelect.value = maxMagnitude;
    }

    return <>
        <div className='settings'>
            <div className='container-fluid'>
                <div className='row px-2 py-3'>
                    <div className='col my-auto'>
                        <div className='window-heading'>SETTINGS</div>
                    </div>
                    <div className='col-auto my-auto'>
                        <div style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={closeWindowAction}>
                            {CloseIcon({ width: '50px', height: '50px' })}
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center px-2'>
                    <div className='col' style={{ maxWidth: '600px' }}>
                        <div className='row'>
                            <div className='col-sm-6 mt-4'>
                                <div className='label mb-2'>Minimum Magnitude</div>
                                <select id='min_magnitude' className='form-select' defaultValue={earthquake.minMagnitude} onChange={() => {
                                    updateMagnitudeBounds();
                                }}>
                                    {minMagnitudeArray.map((value) => {
                                        return <option key={value} value={value}>{value}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-sm-6 mt-4'>
                                <div className='label mb-2'>Maximum Magnitude</div>
                                <select id='max_magnitude' className='form-select' defaultValue={earthquake.maxMagnitude} onChange={() => {
                                    updateMagnitudeBounds();
                                }}>
                                    {maxMagnitudeArray.map((value) => {
                                        return <option key={value} value={value}>{value}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center px-2'>
                    <div className='col' style={{ maxWidth: '600px' }}>
                        <div className='row'>
                            <div className='col-sm-6 mt-4'>
                                <div className='label mb-2'>Plot</div>
                                <select id='plot' className='form-select' defaultValue={earthquake.minMagnitude} onChange={() => {

                                }}>
                                    <option key={5} value={5}>5</option>
                                    <option key={10} value={10}>10</option>
                                    <option key={15} value={15}>15</option>
                                    <option key={20} value={20}>20</option>
                                    <option key={25} value={25}>25</option>
                                    <option key={25} value={30}>30</option>
                                </select>
                            </div>
                            <div className='col-sm-6 mt-4'>
                                <div className='label mb-2'>Theme</div>
                                <select id='theme' className='form-select' defaultValue={earthquake.maxMagnitude} onChange={() => {

                                }}>
                                    <option value='mapbox://styles/jpvitan/ckwjznqa44qhz14qnswqs0koo'>Dark</option>
                                    <option value='mapbox://styles/darkaxe201/ckhupcwep3gh31apgealmhkdc'>Light</option>
                                    <option value='mapbox://styles/darkaxe201/ckhuud56s00xw1as9bnzdupdw'>Terrain</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Settings;
