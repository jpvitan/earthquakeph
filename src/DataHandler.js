export var earthquake = {
    firstFetch: true,
    update: false,
    location: "-",
    latitude: 0.0,
    longitude: 0.0,
    depth: 0.0,
    time: 0,
    magnitude: 0.0
}

export const fetchData = () => {
    var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';

    if (earthquake.firstFetch) {
        url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
        earthquake.firstFetch = false;
    }

    fetch(url).then((response) => { return response.json() }).then((data) => {
        const features = data.features;
        for (var i = 0; i < features.length; i++) {
            const properties = features[i].properties;
            const geometry = features[i].geometry;
            const latitude = geometry.coordinates[1].toFixed(4);
            const longitude = geometry.coordinates[0].toFixed(4);
            if (latitude >= 4 && latitude <= 21 && longitude >= 116 && longitude <= 129) {
                earthquake.location = properties.place;
                earthquake.latitude = latitude
                earthquake.longitude = longitude
                earthquake.depth = geometry.coordinates[2].toFixed(0);
                earthquake.time = properties.time;
                earthquake.magnitude = properties.mag.toFixed(1);
                earthquake.update = true;
                break;
            }
        }
    });
}
