/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

/*
============================================================
Imports
============================================================
*/
import { CloseIcon } from './Icon';

import './History.css';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
============================================================
Functions
============================================================
*/
const History = (closeWindowAction) => {
    return <>
        <div className='history'>
            <div className='container-fluid'>
                <div className='row px-2 py-3'>
                    <div className='col my-auto'>
                        <div className='window-heading'>HISTORY</div>
                    </div>
                    <div className='col-auto my-auto'>
                        <div style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={closeWindowAction}>
                            {CloseIcon({ width: '50px', height: '50px' })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default History;
