/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { BoardStack } from "../components/Board"
import { Value, Link } from '../components/Form'

const System = ({ configuration, engine, earthquake, onClose }) => {
  return (
    <div className='system'>
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-5'>
            <BoardStack>
              <Copyright year={2022} />
            </BoardStack>
          </section>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Links</p>
            <BoardStack>
              <Link
                label='Privacy Policy'
                link='https://sites.google.com/view/earthquakeph-privacy-policy?usp=sharing'
              />
              <hr />
              <Link
                label='License Information'
                link='https://github.com/jpvitan/earthquakeph/blob/master/LICENSE'
              />
              <hr />
              <Link
                label="Developer's Website"
                link='https://jpvitan.com/'
              />
            </BoardStack>
          </section>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>System</p>
            <BoardStack>
              <Value
                label='Version'
                value='5.0.1'
              />
            </BoardStack>
          </section>
        </div>
      </div>
    </div>
  )
}

const Copyright = ({ year }) => {
  return (
    <div className='form-value container-fluid px-0'>
      <div className='row g-0'>
        <div className='col text-center'>
          <img className='shadow-lg mb-2' alt='EarthquakePH' src='apple-touch-icon.png' width={20} height={20} />
          <p className='text-size-xs text-color-gray fw-bold'>EarthquakePH is a highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.</p>
          <p className='text-size-xs text-color-gray fw-bold'>Built by Justine Paul Vitan as a solo project to demonstrate his capabilities in developing rich and scalable web applications. The source code of this project is open and available to the public via GitHub for transparency and open-source collaboration.</p>
          <p className='text-size-xs text-color-gray fw-bold mb-0'>Developed and Designed by Justine Paul Vitan.</p>
          <p className='text-size-xs text-color-gray fw-bold mb-0'>Copyright © {year} Justine Paul Vitan. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default System
