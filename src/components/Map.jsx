import { useGeolocated } from "react-geolocated";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

export default function Map({ children }) {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  let latitude = 40;
  let longitude = 40;

  if (isGeolocationEnabled && coords) {
    latitude = coords.latitude;
    longitude = coords.longitude;
  }

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  return (
    <ReactMapGL
      mapboxApiAccessToken={mapboxAccessToken}
      width={600}
      height={400}
      latitude={latitude}
      longitude={longitude}
      zoom={14}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {children}
    </ReactMapGL>
  );
}
