/*

EarthquakePH
A highly customizable real-time and progressive web application that tracks and monitors the latest earthquake recorded by the United States Geological Survey within the Philippines and the world.

This project is under the MIT license.
Please read the terms and conditions stated within the license before attempting any modification or distribution of the software.

Copyright © 2022 Justine Paul Vitan. All rights reserved.

License Information: https://github.com/jpvitan/earthquakeph/blob/master/LICENSE
Developer's Website: https://jpvitan.com/

*/

import Configuration from '../engine/Configuration'
import Engine from '../engine/Engine'

export default class Control {
  /* Configuration */
  static configuration = new Configuration('Philippines', 1, 10, 50, 300, 'Black Pearl', 'Dark', 7.7, false)
  /* Engine */
  static engine = new Engine(this.configuration)
}
