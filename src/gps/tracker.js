import { getBearingToNextWaypoint } from '../nav/navigator.js';

let lastPos = null;

export function startGPSTracking(onUpdate) {
  navigator.geolocation.watchPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      onUpdate(lat, lon);

      lastPos = pos;
    },
    console.error,
    { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
  );
}
