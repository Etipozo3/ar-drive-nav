import { initScene, updateArrowRotation } from './core/scene.js';
import { startGPSTracking } from './gps/tracker.js';
import { setRoutePoints, getBearingToNextWaypoint } from './nav/navigator.js';

// Cambia estas coordenadas según tu ciudad
const origin = [-0.1278, 51.5074];
const destination = [-0.1425, 51.5155];

initScene();
setRoutePoints(origin, destination);

startGPSTracking((lat, lon) => {
  const bearing = getBearingToNextWaypoint(lat, lon);
  if (bearing !== null) updateArrowRotation(-bearing);
});
