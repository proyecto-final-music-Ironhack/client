import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import Mapbox, { Marker, Popup } from "react-map-gl";
import eventService from "../services/event.service";
import "mapbox-gl/dist/mapbox-gl.css";

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

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      setViewport({
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        zoom: 9,
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
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      style={{ width: "100%", height: "250px" }}
    >
      {isGeolocationAvailable && isGeolocationEnabled && coords && (
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          color="red"
        />
      )}
      {events
        .filter((event) => event.disco)
        .map((event) => {
          return (
            <Marker
              key={event._id}
              latitude={event.disco?.latitude}
              longitude={event.disco?.longitude}
              color="green"
            >
              {/* <Popup
                latitude={event.disco?.latitude}
                longitude={event.disco?.longitude}
              >
                <div>
                  <h3>{event.disco.name}</h3>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </Popup> */}
            </Marker>
          );
        })}{" "}
      {children}
    </Mapbox>
  );
}
