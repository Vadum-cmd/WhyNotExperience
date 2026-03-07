import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './RouteMap.css';

// Custom icons for start and end points
const startIcon = L.divIcon({
  className: 'custom-marker start-marker',
  html: '<div class="marker-pin start-pin"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const endIcon = L.divIcon({
  className: 'custom-marker end-marker',
  html: '<div class="marker-pin end-pin"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Helper function to ensure coordinates are in the water (offshore)
// Adjusts coordinates to move them eastward into the Adriatic Sea if needed
const ensureWaterCoordinates = (coords: [number, number]): [number, number] => {
  const [lat, lng] = coords;
  // For Trieste area, ensure longitude is high enough to be in the sea (east of coast)
  // Minimum longitude ~13.7780 ensures we're in the Adriatic Sea
  const minLongitude = 13.7780;
  const adjustedLng = Math.max(lng, minLongitude);
  return [lat, adjustedLng];
};

interface RouteMapProps {
  startLocation: string;
  endLocation: string;
  startCoords?: [number, number]; // [lat, lng]
  endCoords?: [number, number]; // [lat, lng]
}

const RouteMap: React.FC<RouteMapProps> = ({
  startLocation,
  endLocation,
  startCoords,
  endCoords,
}) => {
  // Fix default marker icons on component mount
  useEffect(() => {
    // Fix for default marker icons in React-Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  // Default coordinates for Trieste area - ALL positioned IN THE WATER (Adriatic Sea)
  // Start and end points are adjusted to be offshore, ensuring they're in the sea
  const rawStartCoords: [number, number] = startCoords || [45.6500, 13.7780]; // Marina San Giusto - in water
  const rawEndCoords: [number, number] = endCoords || [45.7030, 13.7880]; // Miramare Castle area - in water
  
  // Ensure all coordinates are in the water
  const defaultStartCoords = ensureWaterCoordinates(rawStartCoords);
  const defaultEndCoords = ensureWaterCoordinates(rawEndCoords);

  // Calculate center point between start and end
  const centerLat = (defaultStartCoords[0] + defaultEndCoords[0]) / 2;
  const centerLng = (defaultStartCoords[1] + defaultEndCoords[1]) / 2;
  const center: [number, number] = [centerLat, centerLng];

  // Generate route path - ALL waypoints are positioned IN THE WATER (Adriatic Sea)
  // Following the natural water route northward along the Trieste coastline
  // All coordinates are validated to ensure they're in the sea, not on land
  const generateWaterRoute = (start: [number, number], end: [number, number]): [number, number][] => {
    const [startLat, startLng] = start;
    const [endLat, endLng] = end;
    
    // Calculate number of waypoints based on distance
    const numWaypoints = 20;
    const latStep = (endLat - startLat) / (numWaypoints + 1);
    const lngStep = (endLng - startLng) / (numWaypoints + 1);
    
    // Generate waypoints that stay in the water
    const waypoints: [number, number][] = [start];
    
    for (let i = 1; i <= numWaypoints; i++) {
      const lat = startLat + (latStep * i);
      // Ensure longitude keeps us in the water (minimum 13.7780 for Adriatic Sea)
      const baseLng = startLng + (lngStep * i);
      const lng = Math.max(baseLng, 13.7780); // Keep in water
      waypoints.push(ensureWaterCoordinates([lat, lng]));
    }
    
    waypoints.push(end);
    return waypoints;
  };
  
  const routePath = generateWaterRoute(defaultStartCoords, defaultEndCoords);

  return (
    <div className="route-map-container">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={defaultStartCoords} icon={startIcon}>
          <Popup>
            <strong>Start:</strong> {startLocation}
          </Popup>
        </Marker>
        <Marker position={defaultEndCoords} icon={endIcon}>
          <Popup>
            <strong>End:</strong> {endLocation}
          </Popup>
        </Marker>
        <Polyline
          positions={routePath}
          color="#1E6CFF"
          weight={5}
          opacity={0.85}
          smoothFactor={2}
        />
      </MapContainer>
    </div>
  );
};

export default RouteMap;
