import './App.css';
import Map from './Map.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return <>
    <Map />
    <EarthquakeCard />
  </>;
}

const EarthquakeCard = () => {
  return <div className='earthquake-card card shadow-lg text-light fixed-top mx-3 mx-md-auto mt-3 px-3 py-3'>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <h2 className='mb-0'>Earthquake Alert</h2>
          <h5 className='mb-3'>29 km ENE of Pilar, Philippines</h5>
          <h5 className='mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <span className='ms-1'>126.3417° N, 9.9732° E</span>
          </h5>
          <h5 className='mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
            <span className='ms-1'>80 km</span>
          </h5>
        </div>
        <div className='col-auto my-auto d-none d-md-block'>
          <div className='magnitude-circle'>
            <h1 className='magnitude-text'>6.0</h1>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default App;
