export var earthquake = {
    update: false,
    location: "-",
    latitude: 0.0,
    longitude: 0.0,
    depth: 0.0,
    magnitude: 0.0
}

export const fetchData = () => {
    const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';
    fetch(url).then((response) => { return response.json() }).then((data) => {
        const properties = data.features[0].properties;
        const geometry = data.features[0].geometry;
        earthquake.location = properties.place;
        earthquake.latitude = geometry.coordinates[1].toFixed(4);
        earthquake.longitude = geometry.coordinates[0].toFixed(4);
        earthquake.depth = geometry.coordinates[2].toFixed(0);
        earthquake.magnitude = properties.mag.toFixed(1);
        earthquake.update = true;
    });
}
