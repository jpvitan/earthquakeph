import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './Map';
import Overlay from './Overlay';
import { earthquake } from './DataHandler';

function App() {
  return <>
    <Map />
    <EarthquakeCard />
    <Overlay />
  </>;
}

const EarthquakeCard = () => {
  const [location, setLocation] = useState('-');
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  const [depth, setDepth] = useState(0);
  const [time, setTime] = useState(0);
  const [magnitude, setMagnitude] = useState(0.0);

  useEffect(() => {
    var stopUpdate = false;
    const update = () => {
      if (stopUpdate) {
        return;
      }
      if (earthquake.update) {
        setLocation(earthquake.location);
        setLng(earthquake.longitude);
        setLat(earthquake.latitude);
        setDepth(earthquake.depth);
        setTime(earthquake.time);
        setMagnitude(earthquake.magnitude);
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

  return <div className='earthquake-card card shadow-lg text-light mx-3 mx-md-auto mt-lg-3 px-3 py-3'>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col px-0 px-md-3'>
          <h2 className='mb-0'>Earthquake Alert</h2>
          <h5 className='mb-3'>{location}</h5>
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
        <div className='col-auto my-auto'>
          <div className='magnitude-circle'>
            <h1 className='magnitude-text'>{magnitude}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default App;
