/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

import { useEffect, useState } from 'react';
import Map from './Map';
import Overlay from './Overlay';
import List from './List';
import { earthquake, getMagnitudeColor } from './DataHandler';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return <>
    <Map />
    <EarthquakeCard />
    <Scale />
    <Overlay />
    <List />
  </>;
}

const EarthquakeCard = () => {
  const [id, setId] = useState('');
  const [displayEarthquakeInformation, setDisplayEarthquakeInformation] = useState(false);

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

  return (
    <>
      <button className='earthquake-information-button' onClick={() => {
        setDisplayEarthquakeInformation(true);
      }}>
      </button>

      <div className='earthquake-card card shadow-lg text-light mx-3 mx-md-auto mt-xxl-3 px-3 py-3' onClick={() => { setDisplayEarthquakeInformation(true) }} style={{ backgroundColor: getMagnitudeColor(earthquake.magnitude) }}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col px-0 px-md-3'>
              <h2 className='mb-0'>Earthquake Alert</h2>
              <h5 className='mb-3'>{earthquake.location}</h5>
              <h5 className='mb-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
                <span className='ms-1'>{earthquake.depth} km</span>
              </h5>
              <h6 className='mb-1'>
                <span className='ms-1'>{new Date(earthquake.time).toLocaleString()}</span>
              </h6>
            </div>
            <div className='col-auto my-auto'>
              <div className='magnitude-circle'>
                <h1 className='magnitude-text' style={{ color: getMagnitudeColor(earthquake.magnitude) }}>{earthquake.magnitude}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        earthquake.noData &&
        <>
          <span className='badge bg-warning no-data-badge'>No Data</span>
        </>
      }

      {
        displayEarthquakeInformation &&
        <>
          <div className='earthquake-information'>
            <button className='earthquake-information-close-button' onClick={() => { setDisplayEarthquakeInformation(false) }}></button>
            <h1 className='earthquake-information-header'>INFORMATION</h1>
            <div className='earthquake-information-content'>
              <div className='earthquake-information-content-inner'>
                <h3 className='mt-4'>Date and Time</h3>
                <h4>{new Date(earthquake.time).toLocaleString()}</h4>
                <h3 className='mt-4'>Magnitude</h3>
                <h4>{earthquake.magnitude}</h4>
                <h3 className='mt-4'>Depth</h3>
                <h4>{earthquake.depth} km</h4>
                <h3 className='mt-4'>Location</h3>
                <h4>{earthquake.location}</h4>
                <h3 className='mt-4'>Coordinates</h3>
                <h4>{earthquake.latitude}° N, {earthquake.longitude}° E</h4>
                <h3 className='mt-5'>Note:</h3>
                <p>All earthquake-related data is from the USGS API. Discrepancies between the data reported by them and the local authorities are possible.</p>
                <div style={{ height: '5rem' }}></div>
              </div>
            </div>
          </div>
        </>
      }

      {
        earthquake.tsunami === 1 &&
        <img src='./img/tsunami.png' className='tsunami-indicator' alt='Tsunami Indicator' />
      }
    </>
  );
}

const Scale = () => {
  return <div className='scale'>
    <div className='row scale-row text-center'>
      <div className='col minor-earthquake'>
        <p>1-3.9</p>
      </div>
      <div className='col light-earthquake'>
        <p>4-4.9</p>
      </div>
      <div className='col moderate-earthquake'>
        <p>5-5.9</p>
      </div>
      <div className='col strong-earthquake'>
        <p>6-6.9</p>
      </div>
      <div className='col major-earthquake'>
        <p>7-7.9</p>
      </div>
      <div className='col great-earthquake'>
        <p>8+</p>
      </div>
    </div>
  </div>;
}

export default App;
