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

    const MapIcon = () => {
        return (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='50'
                height='50'
                enableBackground='new 0 0 512 512'
                viewBox='0 0 612 612'
                className='style-menu-card-link-icon'
            >
                <path
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#fff'
                    d='M550.4 281.817c-18.385 20.637-36.395 42.868-48.965 73.54-5.721 14.164-19.322 23.357-34.613 23.357-15.383 0-28.984-9.193-34.799-23.45-14.541-35.646-36.584-59.939-57.971-83.39-5.346-5.909-10.693-11.819-15.945-17.916-.281.094-.471.188-.75.281-20.824 6.284-36.865 33.862-27.203 56.281 6.566 15.383 52.623 12.476 48.684 45.587-3.283 27.108 32.172 34.237 44.742 32.925 12.57-1.501 31.893 20.637 22.137 30.392-9.66 9.756-27.953 10.131-25.139 35.27.75 7.316 22.889 6.379 22.889 17.447 0 11.162-11.443 23.826-2.627 36.677 1.877 2.813 3.846 4.971 5.91 6.659-42.398 39.022-98.961 62.941-160.964 62.941-131.041 0-237.6-106.559-237.6-237.6 0-39.771 9.85-77.293 27.203-110.311-.094 42.68 22.7 78.137 33.393 88.83 34.894 34.8 85.454 23.825 91.925 52.997 6.566 29.079-34.707 29.173-31.986 51.403 2.813 22.325 56.562 28.235 44.556 48.777-15.853 27.296 10.693 29.266 3.002 62.94-4.127 18.386 22.418 21.95 32.268 7.974 7.504-10.693 6.003-23.826 21.105-39.865 18.479-19.699 61.347-22.888 56.562-55.438-8.16-54.029-60.689-62.472-83.577-75.136-25.983-14.257-19.604-48.495-25.233-64.816-7.879-23.169-34.613 6.473-48.871-7.035-23.45-22.137 4.221-53.467 23.919-52.81 41.554 1.313 54.311 41.742 69.6 40.334 14.915-1.313 24.577-22.137 27.203-33.205 5.535-24.107-9.38-13.32-15.383-25.89-8.067-16.79 28.328-32.83 42.398-45.212 2.158-1.876 3.752-3.658 4.596-5.347 4.223-8.254-1.312-14.539-10.693-20.261-18.759-11.351-52.997-20.355-54.591-38.083-.939-10.882 19.886-16.134 43.617-17.072 3.939.188 7.785.563 11.726.938a158.516 158.516 0 019.473-32.643c-11.35-1.501-22.887-2.252-34.613-2.252-149.52 0-271.18 121.66-271.18 271.18C14.604 490.34 136.265 612 285.785 612s271.182-121.661 271.182-271.181c0-20.261-2.252-40.053-6.567-59.002zM454.062.603C377.51 7.839 325.078 82.016 338.439 157.741c13.568 76.921 84.49 100.598 119.686 186.942 3.172 7.781 14.127 7.82 17.297.038 39.016-95.766 121.975-114.455 121.975-214.106C597.396 54.282 531.916-6.756 454.062.603zm12.719 198.99c-38.096 0-68.979-30.882-68.979-68.978 0-38.095 30.883-68.977 68.979-68.977s68.977 30.882 68.977 68.977-30.883 68.978-68.977 68.978z'
                    data-original='#000000'
                ></path>
            </svg>
        );
    }

    const MenuCardLink = (props) => {
        return (
            <div className='text-center mx-auto style-menu-card-link-outer'>
                <Link to={props.to} onClick={hideOverlay}>
                    <div className='border-0 shadow mx-auto style-menu-card-link'>
                        {props.icon}
                    </div>
                </Link>
                <div className='mt-2 style-menu-card-link-text'>{props.title}</div>
            </div>
        );
    }

    return <>
        <Logo />
        <MenuButton />
        {displayOverlay &&
            <>
                <div className='overlay'>
                    <div className='container-fluid style-menu-container'>
                        <div className='row justify-content-center'>
                            <div className='col-auto mt-1'>
                                <MenuCardLink to='/' title='MAP' icon={MapIcon()}></MenuCardLink>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }
    </>;
}

export default Overlay;
