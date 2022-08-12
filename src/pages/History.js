/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { earthquake, cycle } from '../api/DataHandler'
import { getMagnitudeColor } from '../utility/Utility'

const History = (closeAction) => {
  const fillData = () => {
    if (cycle.noData) {
      return
    }
    if (earthquake.listHistory.length === 0) {
      setTimeout(fillData, 250)
      return
    }

    const historyContainer = document.getElementById('history_container')
    if (!historyContainer) {
      setTimeout(fillData, 250)
      return
    }

    document.getElementById('spinner_container').innerHTML = ''

    earthquake.listHistory.forEach((earthquake) => {
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
  }

  fillData()

  return (
    <>
      {cycle.noData ? <NoDataNotice /> : <HistorySpinner />}
      <div id='history_container' />
    </>
  )
}

const NoDataNotice = () => {
  return (
    <>
      <div className='row justify-content-center px-2 pb-5'>
        <div className='col-auto text-center'>
          <p className='location-paragraph mb-0'>No Available Data</p>
        </div>
      </div>
    </>
  )
}

const HistorySpinner = () => {
  return (
    <>
      <div id='spinner_container' className='d-flex justify-content-center'>
        <div className='spinner-border text-danger' role='status' />
      </div>
    </>
  )
}

export default History
