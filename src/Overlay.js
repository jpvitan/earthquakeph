/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2020 Justine Paul Sanchez Vitan. All rights reserved.
*/

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './Overlay.css';

const Overlay = () => {
    const [displayOverlay, setDisplayOverlay] = useState(false);

    const MenuButton = () => {
        if (displayOverlay) {
            return <button id='menu-button' className='menu-button menu-button-toggled' onClick={() => { setDisplayOverlay(!displayOverlay) }}>
            </button>;
        }
        return <button id='menu-button' className='menu-button' onClick={() => { setDisplayOverlay(!displayOverlay) }}>
        </button>;
    }

    const Logo = () => {
        return <h1 className='logo'>earthquakeph</h1>;
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
                        <div className='link-container-inner'>
                            <Link to='/' className='link' onClick={hideOverlay}><h1>MAP</h1></Link>
                            <Link to='/settings' className='link' onClick={hideOverlay}><h1>SETTINGS</h1></Link>
                            <Link to='/about' className='link' onClick={hideOverlay}><h1>ABOUT</h1></Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        }
    </>;
}

export default Overlay;
