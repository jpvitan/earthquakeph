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
    <EarthquakeCard />
  </>;
}

const EarthquakeCard = () => {
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
  </>;
}

/*
============================================================
Export
============================================================
*/
export default App;
