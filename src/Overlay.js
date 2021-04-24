import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Overlay.css';
import Footer from './Footer';

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
                        <Link to='/' className='link' onClick={hideOverlay}><h1>MAP</h1></Link>
                        {/* <Link to='/list' className='link' onClick={hideOverlay}><h1>LIST</h1></Link> */}
                        <Link to='/about' className='link' onClick={hideOverlay}><h1>ABOUT</h1></Link>
                    </div>
                </div>
                <Footer />
            </>
        }
    </>;
}

export default Overlay
