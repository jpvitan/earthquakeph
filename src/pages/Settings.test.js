/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Settings, { configuration } from './Settings'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('minimum magnitude', () => {
  let user
  let selectMinimumMagnitude
  let selectMaximumMagnitude

  beforeEach(() => {
    user = userEvent.setup()
    render(<Settings />)
    selectMinimumMagnitude = screen.getByTestId('min_magnitude')
    selectMaximumMagnitude = screen.getByTestId('max_magnitude')
  })

  it('renders the correct options when the maximum magnitude is changed', async () => {
    const io = [
      { input: ['2'], output: '<option value="1">1</option>' },
      { input: ['10'], output: '<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option>' }
    ]
    for (let i = 0; i < io.length; i++) {
      await user.selectOptions(selectMaximumMagnitude, io[i].input)
      expect(selectMinimumMagnitude.innerHTML).toEqual(io[i].output)
    }
  })
})

describe('maximum magnitude', () => {
  let user
  let selectMinimumMagnitude
  let selectMaximumMagnitude

  beforeEach(() => {
    user = userEvent.setup()
    render(<Settings />)
    selectMinimumMagnitude = screen.getByTestId('min_magnitude')
    selectMaximumMagnitude = screen.getByTestId('max_magnitude')
  })

  it('renders the correct options when the minimum magnitude is changed', async () => {
    const io = [
      { input: ['1'], output: '<option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>' },
      { input: ['9'], output: '<option value="10">10</option>' }
    ]
    for (let i = 0; i < io.length; i++) {
      await user.selectOptions(selectMinimumMagnitude, io[i].input)
      expect(selectMaximumMagnitude.innerHTML).toEqual(io[i].output)
    }
  })
})

describe('plot', () => {
  let user
  let selectPlot
  let buttonSave

  beforeEach(() => {
    user = userEvent.setup()
    render(Settings(() => { }))
    selectPlot = screen.getByTestId('plot')
    buttonSave = screen.getByTestId('save_button')
  })

  it('should update the value in the configuration object after the save button is pressed', async () => {
    await user.selectOptions(selectPlot, ['15'])
    await user.click(buttonSave)
    expect(configuration.plot).toBe(15)
  })
})

describe('theme', () => {
  let user
  let selectTheme
  let buttonSave

  beforeEach(() => {
    user = userEvent.setup()
    render(Settings(() => { }))
    selectTheme = screen.getByTestId('theme')
    buttonSave = screen.getByTestId('save_button')
  })

  it('should update the value in the configuration object after the save button is pressed', async () => {
    await user.selectOptions(selectTheme, ['Terrain'])
    await user.click(buttonSave)
    expect(configuration.theme).toBe('mapbox://styles/darkaxe201/ckhuud56s00xw1as9bnzdupdw')
  })
})

describe('location', () => {
  let user
  let selectLocation
  let buttonSave

  beforeEach(() => {
    user = userEvent.setup()
    render(Settings(() => { }))
    selectLocation = screen.getByTestId('location')
    buttonSave = screen.getByTestId('save_button')
  })

  it('should update the value in the configuration object after the save button is pressed', async () => {
    await user.selectOptions(selectLocation, ['1'])
    await user.click(buttonSave)
    expect(configuration.squareAreaValue).toBe('1')
  })
})

describe('update interval', () => {
  let user
  let selectUpdateInterval
  let buttonSave

  beforeEach(() => {
    user = userEvent.setup()
    render(Settings(() => { }))
    selectUpdateInterval = screen.getByTestId('update_interval')
    buttonSave = screen.getByTestId('save_button')
  })

  it('should update the value in the configuration object after the save button is pressed', async () => {
    await user.selectOptions(selectUpdateInterval, ['60'])
    await user.click(buttonSave)
    expect(configuration.updateInterval).toBe('60')
  })
})
