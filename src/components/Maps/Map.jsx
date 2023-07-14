import Mapbox, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import eventService from "../../services/event.service";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import myMarkerCurrentEvent from "../../../src/images/Property 1=Live.svg";
import myMarkerOtherEvent from "../../../src/images/Property 1=Default.svg";
import myImgUser from "../../../src/images/Profile Picture.svg";

const myMarkerCurrent = <img src={myMarkerCurrentEvent} alt="Marker" />;
const myMarkerOther = <img src={myMarkerOtherEvent} alt="Marker" />;
const myMarkerUser = <img src={myImgUser} alt="Marker" />;

export default function Map() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const [events, setEvents] = useState([]);
  const [geolocateUser, setGeolocatedUser] = useState();
  const [popupInfo, setPopupInfo] = useState(null);
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
        zoom: 10,
      });
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

  const renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.disco?.longitude}
          latitude={popupInfo.disco?.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <h3>{popupInfo.disco.name}</h3>
            <p>{new Date(popupInfo.date).toLocaleDateString()}</p>
            <p>{popupInfo.genre}</p>
          </div>
        </Popup>
      )
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
      {events
        .filter((event) => event.disco)
        .map((event) => {
          return (
            <Marker
              key={event._id}
              latitude={event.disco?.latitude}
              longitude={event.disco?.longitude}
              onClick={() => setPopupInfo(event)}
            >
              {isEventNow(event.date) ? myMarkerCurrent : myMarkerOther}
            </Marker>
          );
        })}
      {renderPopup()}
    </Mapbox>
  );
}
