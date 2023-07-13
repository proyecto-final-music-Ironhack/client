import Mapbox, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import eventService from "../../services/event.service";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import myMarkerCurrentEvent from "../../../src/images/Property 1=Live.svg";
import myMarkerOtherEvent from "../../../src/images/Property 1=Default.svg";
import myImgUser from "../../../src/images/Profile Picture.svg";
import { useParams } from "react-router-dom";

const myMarkerCurrent = <img src={myMarkerCurrentEvent} alt="Marker" />;
const myMarkerOther = <img src={myMarkerOtherEvent} alt="Marker" />;
const myMarkerUser = <img src={myImgUser} alt="Marker" />;

export default function MapEvent({ event }) {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const [geolocateUser, setGeolocatedUser] = useState();
  const [viewport, setViewport] = useState({
    latitude: coords?.latitude || 40.4165,
    longitude: coords?.longitude || -3.70256,
    zoom: 3.5,
  });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      setGeolocatedUser({
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        zoom: 12,
      });
      setViewport({
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        zoom: 10,
      });
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

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
      onMove={(evt) => setViewport(evt.viewState)}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      style={{ width: "100%", height: "250px" }}
      attributionControl={false}
      logoControl={false}
    >
      {geolocateUser && (
        <Marker
          latitude={geolocateUser.latitude}
          longitude={geolocateUser.longitude}
        >
          {myMarkerUser}
        </Marker>
      )}
      {event && (
        <Marker
          key={event._id}
          latitude={event.disco.latitude}
          longitude={event.disco.longitude}
        >
          {isEventNow(event.date) ? myMarkerCurrent : myMarkerOther}
        </Marker>
      )}
    </Mapbox>
  );
}
