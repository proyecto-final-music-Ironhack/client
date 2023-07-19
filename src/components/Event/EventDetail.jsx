import { useEffect, useState, useContext } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import eventService from "../../services/event.service";
import userService from "../../services/user.service";
import { useParams, Link } from "react-router-dom";
import MapEvent from "../Maps/MapEvent";
import TrackCard from "../Playlist/TrackCard";
import { AuthContext } from "../../context/auth.context";

function EventDetail() {
  const [event, setEvent] = useState(null);
  const [eventTracks, setEventTracks] = useState(null);
  const [CheckedIn, setCheckedIn] = useState(false);
  const [likeButton, showLikeButton] = useState(true);
  const { user, hasChanged, setHasChanged } = useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const { data } = await eventService.getOneEvent(id);
        const tracks = data.playlist.sort((a, b) => {
          return b.likes.length - a.likes.length;
        });
        setEvent(data);
        setEventTracks(tracks);
        setCheckedIn(user.attendedEvents.some((ev) => ev._id === data._id));
      } catch (err) {
        console.error(err);
      }
    };
    getEvent();
  }, [id, user]);

  // const nowPlayingTrack = Array.from({...eventTracks})[0]
  // console.log('NOW PLAYING', nowPlayingTrack)

  const nowPlayingTrack = eventTracks?.[0];
  console.log(nowPlayingTrack);

  console.log(eventTracks);

  const getTracks = () => {
    return eventTracks.slice(1, 3).map((track) => {
      return <TrackCard key={track._id} {...track} userId={user._id} showLikeButton={false} />;
    });
  };

  // const randomIndex = Math.floor(Math.random() * event?.playlist?.length || 0)
  // const randomTrack = event?.playlist?.[randomIndex]

  const pushAttendedEvent = async () => {
    try {
      await userService.pushEvent(event._id);
      setCheckedIn(user.attendedEvents.some((ev) => ev._id === event._id));
      setHasChanged(!hasChanged);
    } catch (error) {
      console.error(error);
    }
  };
  const formattedDate = event
    ? new Date(event.date).toLocaleDateString("en", {
        day: "2-digit",
        month: "short",
      })
    : "";

  const formattedTime = event
    ? new Date(new Date(event.date).getTime() - 2 * 60 * 60 * 1000).toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  if (!event) {
    return (
      <div>
        <Link to="/events">No event found, sorry. Go to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <h2>
        Disco: <Link to={`/disco/${event.disco._id}`}>{event.disco ? event.disco.name : "No disco information available"}</Link>
      </h2>
      <h2>
        Dj: <Link to={`/dj/${event.dj._id}`}>{event.dj ? event.dj.username : "No DJ information available"}</Link>
      </h2>
      <p>
        {formattedDate} - {formattedTime}
      </p>
      <p>{event.priceOfEntry} €</p>
      <div>
        {user.savedSongs && <Button onClick={pushAttendedEvent}>{CheckedIn ? "Checked In" : "Check In"}</Button>}
        <hr />
        <h2>Now Playing</h2>
        <p>
          Have a look at what the DJ is playing and <span>check in</span> to vote for the next songs
        </p>
        {event.playlist ? <TrackCard key={nowPlayingTrack?._id} {...nowPlayingTrack} userId={user._id} showLikeButton={false} /> : <Spinner />}
      </div>

      <h3>Up next</h3>
      {eventTracks ? getTracks() : <Spinner />}

      <p>check in to see whitch songs are up next at the disco, vote and suggest your favorite ones</p>
      {CheckedIn && <Link to={`/playlist/${event._id}`}>See all</Link>}

      <div>
        <h2>Location</h2>
        <MapEvent event={event} />
      </div>
    </div>
  );
}

export default EventDetail;
