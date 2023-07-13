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
import { Value } from '../components/Form'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { Bar, Line, Scatter } from 'react-chartjs-2'

Chart.register(CategoryScale)
Chart.defaults.color = '#ffffff'

const Statistics = ({ configuration, engine, earthquake, onClose }) => {
  return (
    <div className='statistics'>
      <div className='row justify-content-center'>
        <div className='content-xs col'>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Data Properties</p>
            <BoardStack>
              <Value label='Size' value={earthquake.list.length} />
              <hr />
              <Value label='Location' value={configuration.engine.location.name} />
              <hr />
              <Value label='Minimum Magnitude' value={configuration.engine.minMagnitude} />
              <hr />
              <Value label='Maximum Magnitude' value={configuration.engine.maxMagnitude} />
            </BoardStack>
          </section>
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
                  }
                }}
              />
            </BoardStack>
          </section>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Magnitude-Time Series Plot</p>
            <BoardStack>
              <Line
                data={{
                  labels: earthquake.list.map((earthquake, index) => index + 1),
                  datasets: [{
                    data: earthquake.list.map((earthquake) => earthquake.magnitude),
                    backgroundColor: '#f39c12'
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
                  }
                }}
              />
            </BoardStack>
          </section>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Depth-Frequency Distribution</p>
            <BoardStack>
              <Bar
                data={{
                  labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
                  datasets: [{
                    data: earthquake.statistics.depth
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
                  }
                }}
              />
            </BoardStack>
          </section>
          <section className='mt-5'>
            <p className='text-size-md fw-bold'>Magnitude Versus Depth</p>
            <BoardStack>
              <Scatter
                data={{
                  datasets: [{
                    data: earthquake.list.map((earthquake) => ({ x: earthquake.magnitude, y: earthquake.depth })),
                    backgroundColor: '#f39c12'
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
