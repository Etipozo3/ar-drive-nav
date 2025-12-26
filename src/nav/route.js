import { setWaypoints } from './navigator.js';

export function fetchRoute(origin, destination) {
  const url = `https://router.project-osrm.org/route/v1/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?overview=full&geometries=geojson`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.routes && data.routes[0]) {
        const coords = data.routes[0].geometry.coordinates;
        setWaypoints(coords);
      }
    })
    .catch(console.error);
}
