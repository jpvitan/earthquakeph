/*

earthquakeph
Real-time app that detects the latest earthquake recorded by the USGS within the Philippines.

LICENSE: MIT License
Created by Justine Paul Sanchez Vitan.
Copyright © 2022 Justine Paul Sanchez Vitan. All rights reserved.

*/

import { getMagnitudeColor, getMagnitudeArrayBounds } from './Utility'

describe('getMagnitudeColor', () => {
  it('should return the correct hex value', () => {
    const io = [
      { input: 0, output: '#e74c3c' },
      { input: 1, output: '#7f8c8d' },
      { input: 4, output: '#f1c40f' },
      { input: 5, output: '#f39c12' },
      { input: 6, output: '#d35400' },
      { input: 7, output: '#c0392b' },
      { input: 8, output: '#9b59b6' },
      { input: 9, output: '#9b59b6' }
    ]
    io.forEach((value) => expect(getMagnitudeColor(value.input)).toBe(value.output))
  })
})
