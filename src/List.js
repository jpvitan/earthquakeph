/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2020 Justine Paul Sanchez Vitan. All rights reserved.
*/

import { useEffect, useState } from 'react';
import './List.css';
import { earthquakeList, fetchDataList } from './DataHandler';

const List = () => {
    const [displayList, setDisplayList] = useState(false);
    const [updateList, setUpdateList] = useState(false);

    const ListButton = () => {
        return <button id='list-button' className='list-button' onClick={() => { setDisplayList(!displayList) }}>
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
                setTimeout(update, 1000);
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
                    <button id='list-button' className='list-information-close-button' onClick={() => { setDisplayList(!displayList) }}></button>
                    <h1 className='list-information-header'>HISTORY</h1>
                    <div className='list-information-content'>
                        <div className='list-information-content-inner'>
                            {earthquakeList.map((earthquake) => { return <ListItem key={earthquake.id} earthquake={earthquake} /> })}
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
        <h1>{id}</h1>
    </>
}

export default List;
