/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

export default class Color {
  static Magnitude(magnitude) {
    let color = '#e74c3c'
    if (magnitude >= 1 && magnitude <= 3.9) color = '#7f8c8d'
    else if (magnitude >= 4 && magnitude <= 4.9) color = '#f1c40f'
    else if (magnitude >= 5 && magnitude <= 5.9) color = '#f39c12'
    else if (magnitude >= 6 && magnitude <= 6.9) color = '#d35400'
    else if (magnitude >= 7 && magnitude <= 7.9) color = '#c0392b'
    else if (magnitude >= 8) color = '#9b59b6'
    return color
  }

  static Status(status) {
    let color = '#95a5a6'
    if (status === 'success') color = '#2ecc71'
    else if (status === 'fetching') color = '#f39c12'
    else if (status === 'error') color = '#e74c3c'
    return color
  }
}