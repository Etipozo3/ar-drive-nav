import { computeBearing } from '../gps/bearing.js';
import { fetchRoute } from './route.js';

let waypoints = [];
let currentIndex = 0;
const REPLAN_DISTANCE = 30; // metros, si te desvías más de esto recalcula ruta
let origin = null;
let destination = null;

export function setWaypoints(routeCoords) {
  waypoints = routeCoords;
  currentIndex = 0;
}

export function setRoutePoints(start, end) {
  origin = start;
  destination = end;
  fetchRoute(origin, destination);
}

export function getBearingToNextWaypoint(lat, lon) {
  if (!waypoints.length) return null;

  const next = waypoints[currentIndex];
  const distance = getDistance(lat, lon, next[1], next[0]);

  // Si estás muy lejos del waypoint, recalcular ruta
  if (distance > REPLAN_DISTANCE) {
    if (origin && destination) {
      fetchRoute([lon, lat], destination);
      currentIndex = 0;
    }
  }

  // Avanzar waypoint si estás cerca
  if (distance < 10 && currentIndex < waypoints.length - 1) currentIndex++;

  return computeBearing(lat, lon, next[1], next[0]);
}

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // metros
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
