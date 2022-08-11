/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { toggleLoadingVisibility } from '../App'
import { earthquake, cycle } from '../api/DataHandler'
import { getMagnitudeColor } from '../utility/Utility'
import { useEffect, useState } from 'react'
import './Earthquake.css'
import tsunamiSign from '../assets/img/tsunami.png'

const Earthquake = () => {
  const [id, setId] = useState('')

  console.log(id)

  useEffect(() => {
    let stopUpdate = false
    const update = () => {
      if (stopUpdate) {
        return
      }
      if (cycle.update) {
        if (cycle.noData) {
          toggleLoadingVisibility(false)
          earthquake.id = ''
          earthquake.location = 'No Available Data'
          earthquake.latitude = 0.0
          earthquake.longitude = 0.0
          earthquake.depth = 0.0
          earthquake.time = null
          earthquake.magnitude = 0.0
          earthquake.tsunami = ''
          setId('n/a')
        } else {
          setId(earthquake.id)
        }
        cycle.updateMap = true
        cycle.update = false
      }
      setTimeout(update, 1000)
    }
    update()
    return () => {
      stopUpdate = true
      cycle.firstFetch = true
    }
  }, [])

  return (
    <>
      <EarthquakeCard earthquake={earthquake} />
      <TsunamiSign tsunami={earthquake.tsunami} />
      <MagnitudeScale />
    </>
  )
}

const EarthquakeCard = (props) => {
  const { location, depth, magnitude } = props.earthquake

  return (
    <>
      <div className='earthquake-card shadow-lg text-light px-4 py-4'>
        <div className='row'>
          <div className='col-auto'>
            <h1 style={{ fontWeight: 'bold', color: getMagnitudeColor(magnitude) }}>{magnitude.toFixed(1)}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-auto pe-0'>
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' className='bi bi-caret-down-fill' viewBox='0 0 16 16'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' /></svg>
          </div>
          <div className='col-auto ps-2'>
            <p className='mb-0'>{depth + ' km'}</p>
          </div>
          <div className='col-auto my-auto px-0'>
            <FetchIndicator />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p className='mb-0'>{location}</p>
          </div>
        </div>
      </div>
    </>
  )
}

const FetchIndicator = () => {
  return (
    <>
      <div id='fetch_indicator' className='shadow-lg' />
    </>
  )
}

const TsunamiSign = ({ tsunami }) => {
  return (
    <>
      {tsunami === 1 && <img id='tsunami_sign' src={tsunamiSign} alt='Tsunami Sign' width={24} height={21} />}
    </>
  )
}

const MagnitudeScale = () => {
  return (
    <>
      <div className='magnitude-scale'>
        <div style={{ bottom: '18rem', backgroundColor: getMagnitudeColor(3) }}><p>3-</p></div>
        <div style={{ bottom: '16rem', backgroundColor: getMagnitudeColor(4) }}><p>4</p></div>
        <div style={{ bottom: '14rem', backgroundColor: getMagnitudeColor(5) }}><p>5</p></div>
        <div style={{ bottom: '12rem', backgroundColor: getMagnitudeColor(6) }}><p>6</p></div>
        <div style={{ bottom: '10rem', backgroundColor: getMagnitudeColor(7) }}><p>7</p></div>
        <div style={{ bottom: '8rem', backgroundColor: getMagnitudeColor(8) }}><p>8+</p></div>
      </div>
    </>
  )
}

export default Earthquake
