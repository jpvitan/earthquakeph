import './About.css';
import Overlay from './Overlay';

const About = () => {
    return <div className='about-container'>
        <div class='about-text-container text-center'>
            <h1>ABOUT</h1>
            <p>earthquakeph is a real-time app that detects the latest earthquake recorded by the USGS within the Philippines.</p>
        </div>
        <Overlay />
    </div>;
}

export default About;
