/*

earthquakeph
A highly customizable real-time web application that tracks the latest earthquake recorded by the USGS within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

const Notice = ({ data }) => {
  return (
    <div className='notice container-fluid px-0'>
      {data.map((notice) => <Unit key={notice.id} {...notice} />)}
    </div>
  )
}

const Unit = ({ icon, message }) => {
  return (
    <div className='row mb-4'>
      <div className='col-auto my-auto'>
        {icon}
      </div>
      <div className='col my-auto'>
        <p className='mb-0'>{message}</p>
      </div>
    </div>
  )
}

export default Notice
