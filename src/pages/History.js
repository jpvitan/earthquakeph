/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

/*
============================================================
Imports
============================================================
*/
import { earthquake, earthquakeList, fetchData } from '../api/DataHandler'
import { getMagnitudeColor } from '../Utility'
import { CloseIcon } from '../Icon'

import '../css/Pages.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/*
============================================================
Functions
============================================================
*/
const History = (closeWindowAction) => {
  fetchData(true)

  const fillData = () => {
    if (earthquakeList.length !== 0) {
      const historyContainer = document.getElementById('history_container')
      if (!historyContainer) {
        return
      }

      document.getElementById('spinner_container').innerHTML = ''

      earthquakeList.forEach((earthquake) => {
        const row = document.createElement('div')
        row.className = 'row px-2 pb-5'

        const magnitudeColumn = document.createElement('div')
        magnitudeColumn.className = 'col-auto my-auto text-center'
        const magnitudeHeading = document.createElement('h1')
        magnitudeHeading.style.fontWeight = 'bold'
        magnitudeHeading.style.color = getMagnitudeColor(earthquake.magnitude)
        magnitudeHeading.innerHTML = earthquake.magnitude.toFixed(1)
        const depthParagraph = document.createElement('p')
        depthParagraph.className = 'depth-paragraph badge bg-warning mb-0'
        depthParagraph.innerHTML = earthquake.depth + ' km'

        magnitudeColumn.appendChild(magnitudeHeading)
        magnitudeColumn.appendChild(depthParagraph)

        const dataColumn = document.createElement('div')
        dataColumn.className = 'col my-auto'
        const locationParagraph = document.createElement('p')
        locationParagraph.className = 'location-paragraph mb-0'
        locationParagraph.innerHTML = earthquake.location
        const timeParagraph = document.createElement('p')
        timeParagraph.className = 'time-paragraph mb-0'
        timeParagraph.innerHTML = new Date(earthquake.time).toLocaleString()

        dataColumn.appendChild(locationParagraph)
        dataColumn.appendChild(timeParagraph)

        row.appendChild(magnitudeColumn)
        row.appendChild(dataColumn)

        historyContainer.appendChild(row)
      })
      earthquakeList.splice(0, earthquakeList.length)
      return
    }
    setTimeout(fillData, 1000)
  }

  if (!earthquake.noData) {
    fillData()
  }

  return (
    <>
      <div className='history'>
        <div id='history_container' className='container-fluid'>
          <div className='row px-2 py-3'>
            <div className='col my-auto'>
              <div className='window-heading'>History</div>
            </div>
            <div className='col-auto my-auto'>
              <div style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={closeWindowAction}>
                {CloseIcon({ width: '50px', height: '50px' })}
              </div>
            </div>
          </div>
          {earthquake.noData ? <NoDataNotice /> : <HistorySpinner />}
        </div>
      </div>
    </>
  )
}

const NoDataNotice = () => {
  return (
    <div className='row justify-content-center px-2 pb-5'>
      <div className='col-auto text-center'>
        <p className='location-paragraph mb-0'>No Available Data</p>
      </div>
    </div>
  )
}

const HistorySpinner = () => {
  return (
    <div id='spinner_container' className='d-flex justify-content-center'>
      <div className='spinner-border text-danger' role='status' />
    </div>
  )
}

export default History
