/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Icon from '../utilities/Icon'

export const Value = ({ label, value }) => {
  return (
    <div className='form-value container-fluid px-0'>
      <div className='row g-0'>
        <div className='col my-auto'>
          <label>{label}</label>
        </div>
        <div className='col-auto my-auto'>
          <p className='text-size-sm text-color-gray mb-0'>{value}</p>
        </div>
      </div>
    </div>
  )
}

export const Slider = ({ label, value, min, max, step, onChange, indicator }) => {
  return (
    <div className='form-slider container-fluid px-0'>
      <div className='row g-0'>
        <div className='col'>
          <label>{label}</label>
          <input className='form-range' type='range' value={value} min={min} max={max} step={step} onChange={onChange} />
          {indicator && <p className='text-size-sm text-color-gray mb-0'>{indicator}</p>}
        </div>
      </div>
    </div>
  )
}

export const Switch = ({ label, checked, onChange }) => {
  return (
    <div className='form-switch container-fluid px-0'>
      <div className='row g-0'>
        <div className='col my-auto'>
          <label>{label}</label>
        </div>
        <div className='col-auto my-auto'>
          <div className='form-check form-switch'>
            <input className='form-check-input' type='checkbox' checked={checked} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const Drop = ({ label, value, option, onChange }) => {
  return (
    <div className='form-drop container-fluid px-0'>
      <div className='row g-0'>
        <div className='col my-auto'>
          <label>{label}</label>
        </div>
        <div className='col-auto my-auto'>
          <select value={value} className='form-select text-size-sm text-color-gray' onChange={onChange}>
            {option.map((option) => <option key={option.value} value={option.value}>{option.text}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export const Link = ({ label, link }) => {
  return (
    <a href={link}>
      <div className='form-link container-fluid px-0'>
        <div className='row g-0'>
          <div className='col my-auto'>
            <label>{label}</label>
          </div>
          <div className='col-auto my-auto'>
            {Icon.Down({ transform: 'rotate(270deg)', display: 'block', width: 10, height: 10, color: '#fff' })}
          </div>
        </div>
      </div>
    </a>
  )
}

export const Field = ({ label, placeholder, value, onChange }) => {
  return (
    <div className='form-field container-fluid px-0'>
      <div className='row g-0'>
        <div className='col'>
          <div className='input-group'>
            <span className='input-group-text'>{label}</span>
            <input className='form-control' type='text' placeholder={placeholder} value={value} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
