import { initScene, updateArrowRotation } from './core/scene.js';
import { startCamera } from './core/camera.js';
import { startGPSTracking } from './gps/tracker.js';
import { setRoutePoints, getBearingToNextWaypoint } from './nav/navigator.js';

async function startApp() {

  // 🔥 ESTO DISPARA EL PERMISO DE CÁMARA
  await startCamera();

  initScene();

  // Coordenadas de prueba
  const origin = [-0.1278, 51.5074];
  const destination = [-0.1425, 51.5155];

  setRoutePoints(origin, destination);

  // 🔥 ESTO DISPARA EL PERMISO DE GPS
  startGPSTracking((lat, lon) => {
    const bearing = getBearingToNextWaypoint(lat, lon);
    if (bearing !== null) updateArrowRotation(-bearing);
  });
}

startApp();
