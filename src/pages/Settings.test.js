/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Settings from './Settings'
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
      { input: ['5'], output: '<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>' },
      { input: ['10'], output: '<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option>' }
    ]
    for (let i = 0; i < io.length; i++) {
      await user.selectOptions(selectMaximumMagnitude, io[i].input)
      expect(selectMinimumMagnitude.innerHTML).toEqual(io[i].output)
    }
  })
})
