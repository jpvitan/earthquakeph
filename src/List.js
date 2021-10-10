/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

import { useEffect, useState } from 'react';
import './List.css';
import { earthquakeList, fetchDataList, getMagnitudeColor } from './DataHandler';

const List = () => {
    const [displayList, setDisplayList] = useState(false);
    const [updateList, setUpdateList] = useState(false);

    const ListButton = () => {
        return <button id='list-button' className='list-button' onClick={() => { setDisplayList(!displayList) }} aria-label='List Button'>
        </button>;
    }

    useEffect(() => {
        if (displayList) {
            fetchDataList();

            const update = () => {
                if (earthquakeList.length !== 0) {
                    setUpdateList(true);
                    return;
                }
                setTimeout(update, 250);
            }

            update();
        } else {
            earthquakeList.splice(0, earthquakeList.length);
            setUpdateList(false);
        }
    }, [displayList]);

    return <>
        <ListButton />
        {
            displayList &&
            <>
                <div className='list-information'>
                    <button id='list-button' className='list-information-close-button' onClick={() => { setDisplayList(!displayList) }} aria-label='Close List Button'></button>
                    <h1 className='list-information-header'>HISTORY</h1>
                    <div className='list-information-content'>
                        <div className='list-information-content-inner'>
                            <div style={{ height: '1rem' }}></div>
                            {updateList ||
                                <div className='d-flex justify-content-center'>
                                    <div className='spinner-border text-danger' role='status'>
                                    </div>
                                </div>
                            }
                            {earthquakeList.map((earthquake) => { return <ListItem key={earthquake.id} earthquake={earthquake} /> })}

                            <div style={{ height: '5rem' }}></div>
                        </div>
                    </div>
                </div>
            </>
        }
    </>
}

const ListItem = (props) => {
    const { id, location, latitude, longitude, depth, time, magnitude, tsunami } = props.earthquake;

    return <>
        <div className='row mb-5 px-0'>
            <div className='col-auto'>
                <div className='magnitude-container'>
                    <h1 className='magnitude-text' style={{ color: getMagnitudeColor(magnitude) }}>{magnitude}</h1>
                </div>
            </div>
            <div className='col'>
                <h5 className='mb-1'>{location}</h5>
                <h5 className='mb-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    <span className='ms-1'>{depth} km</span>
                </h5>
                <h6 className='mb-1'>
                    <span className='ms-1'>{new Date(time).toLocaleString()}</span>
                </h6>
            </div>
        </div>
    </>
}

export default List;
