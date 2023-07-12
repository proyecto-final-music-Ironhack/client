import Mapbox, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import eventService from "../services/event.service";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import myMarkerCurrentEvent from "../../src/images/Property 1=Live.svg";
import myMarkerOtherEvent from "../../src/images/Property 1=Default.svg";

const myMarkerCurrent = <img src={myMarkerCurrentEvent} alt="Marker" />;
const myMarkerOther = <img src={myMarkerOtherEvent} alt="Marker" />;

export default function Map({ children }) {
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const [events, setEvents] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: coords?.latitude || 40.4165,
    longitude: coords?.longitude || -3.70256,
    zoom: 16,
  });

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

  const isEventNow = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const OneHourEvent = new Date(now.getTime() + 60);
    return (
      now.getDate() === event.getDate() &&
      now.getMonth() === event.getMonth() &&
      now.getFullYear() === event.getFullYear() &&
      now.getHours() === OneHourEvent.getHours()
    );
  };

  return (
    <Mapbox
      {...viewport}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      style={{ width: "100%", height: "250px" }}
      attributionControl={false}
      logoControl={false}
    >
      {events
        .filter((event) => event.disco)
        .map((event) => {
          return (
            <Marker
              key={event._id}
              latitude={event.disco.latitude}
              longitude={event.disco.longitude}
            >
              {isEventNow(event.date) ? myMarkerCurrent : myMarkerOther}
            </Marker>
          );
        })}{" "}
      {children}
    </Mapbox>
  );
}
