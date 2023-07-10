import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import Mapbox, { Marker, Popup } from "react-map-gl";
import eventService from "../services/event.service";

export default function Map({ children }) {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const [events, setEvents] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: coords?.latitude || 40.4165,
    longitude: coords?.longitude || -3.70256,
    zoom: 14,
  });

  // Obtén las coordenadas del usuario al montar el componente
  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      setViewport({
        latitude: coords.latitude,
        longitude: coords.longitude,
        zoom: 14,
      });
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventService.getAllEvent();
        setEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <Mapbox
      {...viewport}
      width="100%"
      height="100%"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {isGeolocationAvailable && isGeolocationEnabled && coords && (
        <Marker latitude={coords.latitude} longitude={coords.longitude} />
      )}

      {/* {events.map((event) => (
        <Marker
          key={event._id}
          latitude={event.latitude}
          longitude={event.longitude}
        >
          <Popup latitude={event.latitude} longitude={event.longitude}>
            <div>
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
          </Popup>
        </Marker>
      ))} */}

      {children}
    </Mapbox>
  );
}
