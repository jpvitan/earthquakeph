/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2020 Justine Paul Sanchez Vitan. All rights reserved.
*/

export var earthquake = {
    firstFetch: true,
    update: false,
    updateMap: false,
    id: "",
    location: "-",
    latitude: 0.0,
    longitude: 0.0,
    depth: 0.0,
    time: 0,
    magnitude: 0.0,
    tsunami: "",
    count: 0,
    square_area_value: 0,
    minMagnitude: 1,
    maxMagnitude: 10,
    noData: false
}

export var earthquakeList = []

const coordinatesByValue = [[4, 21, 116, 129], [-10, 8, 94, 142], [28, 46, 128, 146], [-89, 89, -179, 179]];

export const fetchData = () => {
    var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';

    if (earthquake.firstFetch) {
        url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
        earthquake.firstFetch = false;
        earthquake.noData = false;
    }

    fetch(url).then((response) => { return response.json() }).then((data) => {
        const features = data.features;

        var foundData = false;

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
                if (properties.mag == null) {
                    continue;
                }

                let magnitude = properties.mag.toFixed(1);

                if (!(magnitude >= earthquake.minMagnitude && magnitude <= earthquake.maxMagnitude)) {
                    continue;
                }

                earthquake.id = features[i].id;
                earthquake.location = properties.place;
                earthquake.latitude = latitude;
                earthquake.longitude = longitude;
                earthquake.depth = geometry.coordinates[2].toFixed(0);
                earthquake.time = properties.time;
                earthquake.magnitude = magnitude;
                earthquake.tsunami = properties.tsunami;

                foundData = true;

                break;
            }
        }

        if (!(foundData) && url === 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson') {
            earthquake.noData = true;
        }

        earthquake.update = true;
    });
}

export const fetchDataList = () => {
    earthquakeList = [];

    var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

    fetch(url).then((response) => { return response.json() }).then((data) => {
        const features = data.features;

        for (var i = 0; i < features.length; i++) {
            const properties = features[i].properties;
            const geometry = features[i].geometry;
            const latitude = geometry.coordinates[1].toFixed(4);
            const longitude = geometry.coordinates[0].toFixed(4);

            const latL = coordinatesByValue[earthquake.square_area_value][0];
            const latR = coordinatesByValue[earthquake.square_area_value][1];
            const longL = coordinatesByValue[earthquake.square_area_value][2];
            const longR = coordinatesByValue[earthquake.square_area_value][3];

            if (latitude >= latL && latitude <= latR && longitude >= longL && longitude <= longR) {
                if (properties.mag == null) {
                    continue;
                }

                let magnitude = properties.mag.toFixed(1);

                if (!(magnitude >= earthquake.minMagnitude && magnitude <= earthquake.maxMagnitude)) {
                    continue;
                }

                earthquake.id = features[i].id;
                earthquake.location = properties.place;
                earthquake.latitude = latitude;
                earthquake.longitude = longitude;
                earthquake.depth = geometry.coordinates[2].toFixed(0);
                earthquake.time = properties.time;
                earthquake.magnitude = magnitude;
                earthquake.tsunami = properties.tsunami;

                earthquakeList.push({ id: earthquake.id, location: earthquake.location, latitude: earthquake.latitude, longitude: earthquake.longitude, depth: earthquake.depth, time: earthquake.time, magnitude: earthquake.magnitude, tsunami: earthquake.tsunami });
            }
        }
    })
}
