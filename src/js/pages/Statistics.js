/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import { BoardStack } from '../components/Board'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale)
Chart.defaults.color = '#ffffff'

const Statistics = ({ configuration, engine, earthquake, onClose }) => {
  return (
    <div className='statistics'>
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Magnitude-Frequency Distribution</p>
            <BoardStack>
              <Bar
                data={{
                  labels: ['3-', '4', '5', '6', '7', '8+'],
                  datasets: [{
                    data: earthquake.statistics.magnitude,
                    backgroundColor: [
                      '#7f8c8d',
                      '#f1c40f',
                      '#f39c12',
                      '#d35400',
                      '#c0392b',
                      '#9b59b6'
                    ]
                  }]
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false
                      }
                    },
                    y: {
                      grid: {
                        display: false
                      }
                    }
                  },
                  animation: {
                    delay: 500
                  }
                }}
              />
            </BoardStack>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Statistics
