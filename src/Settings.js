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
            <div style={{ position: 'fixed', right: '1.5rem', top: '1.5rem', width: '50px', height: '50px' }} onClick={closeWindowAction}>
                {CloseIcon({ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px' })}
            </div>
        </div>
    </>;
}

export default Settings;
