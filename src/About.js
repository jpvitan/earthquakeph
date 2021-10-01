/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2020 Justine Paul Sanchez Vitan. All rights reserved.
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
                    <h1 className='mt-2'>Developer</h1>
                    <p>Justine Paul Vitan</p>
                </div>
            </div>
        </div>
        <Overlay />
    </div>;
}

export default About;
