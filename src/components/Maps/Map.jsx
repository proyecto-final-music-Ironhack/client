import { Link } from "react-router-dom";
import eventService from "../../services/event.service";
import { useContext, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import Mapbox, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import myMarkerCurrentEvent from "../../../src/images/Property 1=Live.svg";
import myMarkerOtherEvent from "../../../src/images/Property 1=Default.svg";
import { AuthContext } from "../../context/auth.context";
import { Heading } from "@chakra-ui/react";

const myMarkerCurrent = <img src={myMarkerCurrentEvent} alt="Marker" />;
const myMarkerOther = <img src={myMarkerOtherEvent} alt="Marker" />;

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
  const { user } = useContext(AuthContext);
  const myMarkerUser = (
    <img
      style={{ height: "20px", width: "20px", borderRadius: "50%" }}
      src={user.image}
      alt="Marker"
    />
  );

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
  }, [isGeolocationAvailable, isGeolocationEnabled, coords, user]);

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
    return event >= now && event <= new Date(now.getTime() + 120 * 60 * 1000);
  };

  const renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          color="white"
          tipSize={5}
          anchor="top"
          longitude={popupInfo.disco?.longitude}
          latitude={popupInfo.disco?.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <Heading color={"black"} size={"3px"}>
              {popupInfo.name}
            </Heading>
            <p>{popupInfo.disco.name}</p>
            <p>
              {new Date(popupInfo.date).toLocaleDateString("es-ES", {
                month: "2-digit",
                day: "2-digit",
                timeZone: "UTC",
              })}
            </p>
            <p>{popupInfo.genre}</p>
            <Link to={`/event/${popupInfo._id}`}>VIEW</Link>
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
      style={{ width: "100%", height: "254px" }}
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
        .filter((event) => event.disco && new Date(event.date) > new Date())
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
