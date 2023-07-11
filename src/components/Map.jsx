import Mapbox, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import eventService from "../services/event.service";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import myMarkerCurrentEvent from "../../public/Property 1=Live.svg";
import myMarkerOtherEvent from "../../public/Property 1=Default.svg";
import myImgUser from "../../public/Profile Picture.svg";

const myMarkerCurrent = <img src={myMarkerCurrentEvent} alt="Marker" />;
const myMarkerOther = <img src={myMarkerOtherEvent} alt="Marker" />;
const myMarkerUser = <img src={myImgUser} alt="Marker" />;

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
        zoom: 10,
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
    >
      {isGeolocationAvailable && isGeolocationEnabled && coords && (
        <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
          {myMarkerUser}
        </Marker>
      )}
      {events
        .filter((event) => event.disco)
        .map((event) => {
          return (
            <Marker
              key={event._id}
              latitude={event.disco?.latitude}
              longitude={event.disco?.longitude}
            >
              {isEventNow(event.date) ? myMarkerCurrent : myMarkerOther}
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
