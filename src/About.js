/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

import Overlay from './Overlay';
import './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    return <div className='about-container'>
        <div className='about-inner-container'>
            <div className='row justify-content-center'>
                <div className='col' style={{ maxWidth: "40rem" }}>
                    <h1>About</h1>
                    <p>earthquakeph is a real-time app that detects the latest earthquake recorded by the USGS within the Philippines.</p>
                    <div className='mt-5 brand-container'>
                        <h4>earthquakeph</h4>
                        <p>Version 1.0.0</p>
                        <p>Developed and Designed by Justine Paul Sanchez Vitan.</p>
                        <p>Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
        <Overlay />
    </div>;
}

export default About;
