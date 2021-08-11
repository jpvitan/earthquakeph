/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2020 Justine Paul Sanchez Vitan. All rights reserved.
*/

import { useState } from 'react';
import './List.css';

const List = () => {
    const [displayList, setDisplayList] = useState(false);

    const ListButton = () => {
        return <button id='list-button' className='list-button' onClick={() => { setDisplayList(!displayList) }}>
        </button>;
    }

    return <>
        <ListButton />
        {
            displayList &&
            <>
                <div className='list-information'>
                    <button id='list-button' className='list-information-close-button' onClick={() => { setDisplayList(!displayList) }}></button>
                    <h1 className='list-information-header'>HISTORY</h1>
                </div>
            </>
        }
    </>
}

export default List;
