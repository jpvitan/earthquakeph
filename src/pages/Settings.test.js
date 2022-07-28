/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import Settings from './Settings'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('minimum magnitude', () => {
  render(<Settings />)
  const selectElement = screen.getByTestId('min_magnitude')

  it('has an initial value of 1', () => {
    expect(selectElement.value).toBe('1')
  })
  it('changes value on selection', () => {
    for (let i = 2; i <= 9; i++) {
      fireEvent.change(selectElement, { target: { value: i } })
      expect(selectElement.value).toBe(i.toString())
    }
  })
})
