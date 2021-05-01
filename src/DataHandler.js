/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2020 Justine Paul Sanchez Vitan. All rights reserved.
*/

export var earthquake = {
    firstFetch: true,
    update: false,
    id: "",
    location: "-",
    latitude: 0.0,
    longitude: 0.0,
    depth: 0.0,
    time: 0,
    magnitude: 0.0,
    tsunami: "",
    count: 0,
    square_area_value: 0
}

const coordinatesByValue = [[4, 21, 116, 129], [-10, 8, 94, 142], [28, 46, 128, 146], [-90, 90, -180, 180]];

export const fetchData = () => {
    var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';

    if (earthquake.firstFetch) {
        url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
        earthquake.firstFetch = false;
    }

    fetch(url).then((response) => { return response.json() }).then((data) => {
        const features = data.features;
        for (var i = earthquake.count; i < features.length; i++) {
            const properties = features[i].properties;
            const geometry = features[i].geometry;
            const latitude = geometry.coordinates[1].toFixed(4);
            const longitude = geometry.coordinates[0].toFixed(4);

            const latL = coordinatesByValue[earthquake.square_area_value][0];
            const latR = coordinatesByValue[earthquake.square_area_value][1];
            const longL = coordinatesByValue[earthquake.square_area_value][2];
            const longR = coordinatesByValue[earthquake.square_area_value][3];

            if (latitude >= latL && latitude <= latR && longitude >= longL && longitude <= longR) {
                let magnitude = properties.mag.toFixed(1);

                if(earthquake.square_area_value == 3 && magnitude < 4){
                    continue;
                }

                earthquake.id = features[i].id;
                earthquake.location = properties.place;
                earthquake.latitude = latitude
                earthquake.longitude = longitude
                earthquake.depth = geometry.coordinates[2].toFixed(0);
                earthquake.time = properties.time;
                earthquake.magnitude = magnitude;
                earthquake.tsunami = properties.tsunami;
                earthquake.update = true;
                break;
            }
        }
    });
}
