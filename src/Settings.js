/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

/*
============================================================
Imports
============================================================
*/
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
                <div className='row justify-content-center px-2 py-3'>
                    <div className='col' style={{ maxWidth: '600px' }}>
                        <div className='row'>
                            <div className='col-sm-6 mt-4'>
                                <div className='label'>Minimum Magnitude</div>
                                <select id='min_magnitude' className="form-select" onChange={() => {
                                    // setMinMagnitude(document.getElementById('min_magnitude').value);
                                }}>
                                    {/* {minMagnitudeArray.map((value) => { return <option key={value} value={value}>{value}</option> })} */}
                                </select>
                            </div>
                            <div className='col-sm-6 mt-4'>
                                <div className='label'>Maximum Magnitude</div>
                                <select id='max_magnitude' className="form-select" onChange={() => {
                                    // setMaxMagnitude(document.getElementById('max_magnitude').value);
                                }}>
                                    {/* {maxMagnitudeArray.map((value) => { return <option key={value} value={value}>{value}</option> })} */}
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
