import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Overlay.css';

const Overlay = () => {
    const [displayOverlay, setDisplayOverlay] = useState(false);

    const MenuButton = () => {
        return <button className='menu-button' onClick={() => { setDisplayOverlay(!displayOverlay) }}>
        </button>
    }

    return <>
        <MenuButton />
        {displayOverlay &&
            <div className='overlay'>
                <div className='link-container text-center'>
                    <Link to='/' className='link' onClick={() => setDisplayOverlay(false)}><h1>Map</h1></Link>
                    <Link to='/list' className='link' onClick={() => setDisplayOverlay(false)}><h1>List</h1></Link>
                    <Link to='/about' className='link' onClick={() => setDisplayOverlay(false)}><h1>About</h1></Link>
                </div>
            </div>
        }
    </>;
}

export default Overlay
