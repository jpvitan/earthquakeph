/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export const Value = ({ label, value, separator }) => {
  return (
    <>
      <div className='value row'>
        <div className='col'>
          <label>{label}</label>
        </div>
        <div className='col-auto'>
          <p className='mb-0'>{value}</p>
        </div>
      </div>
      {separator && <Separator />}
    </>
  )
}

export const Switch = ({ label, checked, onChange, separator }) => {
  return (
    <>
      <div className='switch row'>
        <div className='col'>
          <label>{label}</label>
        </div>
        <div className='col-auto'>
          <div className='form-check form-switch'>
            <input className='form-check-input' type='checkbox' checked={checked} onChange={onChange} />
          </div>
        </div>
      </div>
      {separator && <Separator />}
    </>
  )
}

export const Slider = ({ label, value, min, max, step, onChange, indicator, separator }) => {
  return (
    <>
      <div className='slider row'>
        <div className='col'>
          <label>{label}</label>
          <input className='form-range' type='range' value={value} min={min} max={max} step={step} onChange={onChange} />
          {indicator && <p className='indicator mb-0'>{indicator}</p>}
        </div>
      </div>
      {separator && <Separator />}
    </>
  )
}

export const Separator = () => {
  return (
    <div className='row'><div className='col'><hr /></div></div>
  )
}