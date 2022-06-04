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

import './About.css';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
============================================================
Functions
============================================================
*/
const About = (closeWindowAction) => {
    return <>
        <div className='about'>
            <div className='container-fluid'>
                <div className='row px-2 py-3'>
                    <div className='col my-auto'>
                        <div className='window-heading'>ABOUT</div>
                    </div>
                    <div className='col-auto my-auto'>
                        <div style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={closeWindowAction}>
                            {CloseIcon({ width: '50px', height: '50px' })}
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center text-center py-5'>
                    <div className='col-auto my-auto'>
                        <div className='earthquakeph-text'>earthquakeph</div>
                        <p style={{ fontWeight: 'bold' }}>Version 2.0.3</p>
                        <p className='mb-0' style={{ fontSize: '0.8rem', fontWeight: '500' }}>Developed and Designed by Justine Paul Sanchez Vitan.</p>
                        <p className='mb-0' style={{ fontSize: '0.8rem', fontWeight: '500' }}>Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.</p>
                    </div>
                </div>
                <div className='row justify-content-center pb-5'>
                    <div className='col-auto'>
                        <a href='https://jpvitan.com/' className='btn px-4 py-2 shadow developer-website-button'>Developer Website</a>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default About;
