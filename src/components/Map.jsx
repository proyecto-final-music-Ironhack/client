import { useGeolocated } from "react-geolocated";
import Mapbox, { Marker, Popup } from "react-map-gl";

export default function Map({ children }) {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const latitude = coords?.latitude || 40.4165;
  const longitude = coords?.longitude || -3.70256;
  return (
    <Mapbox
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        longitude,
        latitude,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {isGeolocationAvailable && isGeolocationEnabled && coords && (
        <Marker latitude={coords.latitude} longitude={coords.longitude}>
          <div>You are here!</div>
        </Marker>
      )}
      {children}
    </Mapbox>
  );
}
