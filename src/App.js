/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

/*
============================================================
Imports
============================================================
*/
import Map from './Map';
import { earthquake } from './DataHandler';
import { getMagnitudeColor } from './Utility';
import { useEffect, useState } from 'react';

import './App.css';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
============================================================
Functions
============================================================
*/
function App() {
  return <>
    <Map />
    <EarthquakeInformation />
  </>;
}

const EarthquakeInformation = () => {
  const [id, setId] = useState('');

  useEffect(() => {
    var stopUpdate = false;
    const update = () => {
      if (stopUpdate) {
        return;
      }
      if (earthquake.update) {
        if (earthquake.noData) {
          earthquake.id = "";
          earthquake.location = "-";
          earthquake.latitude = 0.0;
          earthquake.longitude = 0.0;
          earthquake.depth = 0.0;
          earthquake.time = null;
          earthquake.magnitude = 0.0;
          earthquake.tsunami = "";
          setId("n/a");
        } else {
          setId(earthquake.id);
          earthquake.updateMap = true;
        }
        earthquake.update = false;
      }
      setTimeout(update, 1000);
    }
    update();
    return () => {
      stopUpdate = true;
      earthquake.firstFetch = true;
    }
  }, []);

  return <>
    <EarthquakeCard earthquake={earthquake} />
  </>;
}

const EarthquakeCard = (props) => {
  const { id, location, latitude, longitude, depth, time, magnitude, tsunami } = props.earthquake;

  return <>
    <div className='earthquake-card shadow-lg text-light px-4 py-4'>
      <div className='row'>
        <div className='col-auto my-auto'>
          <h1 style={{ fontWeight: 'bold' }}>{magnitude}</h1>
        </div>
        <div className='col-auto my-auto'>
          <div className='magnitude-circle' style={{ backgroundColor: getMagnitudeColor(magnitude) }}>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p className='mb-0' style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{location}</p>
        </div>
      </div>
    </div>
  </>;
}

export default App;
