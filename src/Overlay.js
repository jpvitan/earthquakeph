import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Overlay.css';

const Overlay = () => {
    const [displayOverlay, setDisplayOverlay] = useState(false);

    const MenuButton = () => {
        return <button className='menu-button' onClick={() => { setDisplayOverlay(!displayOverlay) }}>
        </button>;
    }

    const Logo = () => {
        return <h1 className='logo'>earthquakeph</h1>;
    }

    const Footer = () => {
        return <div className='footer-container text-center'>
            <p className='mb-0'>Developed and Designed by Justine Paul Sanchez Vitan.</p>
            <p className='mb-0'>Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.</p>
        </div>;
    }

    const hideOverlay = () => {
        setDisplayOverlay(false);
    }

    return <>
        <Logo />
        <MenuButton />
        {displayOverlay &&
            <>
                <div className='overlay'>
                    <div className='link-container text-center'>
                        <Link to='/' className='link' onClick={hideOverlay}><h1>MAP</h1></Link>
                        <Link to='/list' className='link' onClick={hideOverlay}><h1>LIST</h1></Link>
                        <Link to='/about' className='link' onClick={hideOverlay}><h1>ABOUT</h1></Link>
                    </div>
                </div>
                <Footer />
            </>
        }
    </>;
}

export default Overlay
