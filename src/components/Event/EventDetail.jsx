import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import eventService from "../../services/event.service";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import MapEvent from "../Maps/MapEvent";
import TrackCard from "../Playlist/TrackCard";

function EventDetail() {
  const [event, setEvent] = useState(null);
  const [eventTracks, setEventTracks] = useState(null);
  const { id } = useParams();

  const getEvent = async () => {
    try {
      const { data } = await eventService.getOneEvent(id);
      const tracks = data.playlist.sort((a, b) => {
        return b.likes.length - a.likes.length;
      });
      setEvent(data);
      setEventTracks(tracks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEvent();
  }, [id]);

  // Get tracks for preview "Up Next"
  const getTracks = () => {
    return eventTracks.slice(0, 2).map((track) => {
      return <TrackCard key={track._id} {...track} />;
    });
  };

  // Get random track
  const randomIndex = Math.floor(Math.random() * event?.playlist.length);
  const randomTrack = event?.playlist[randomIndex];

  if (!event) {
    return (
      <div>
        <Link to="/events">No event found, sorry. Go to Home</Link>
      </div>
    );
  }

  // Formate Dates
  const formattedDate = new Date(event.date).toLocaleDateString();
  const formattedTime = new Date(event.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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
        <h2>Now Playing</h2>
        <p>
          Have a look at what the DJ is playing and <span>check in</span> to vote for the next songs
        </p>
        {event.playlist ? <TrackCard {...randomTrack} /> : <Spinner />}
      </div>

      <h3>Up next</h3>
      {eventTracks ? getTracks() : <Spinner />}

      <p>check in to see whitch songs are up next at the disco, vote and suggest your favorite ones</p>
      <Link to={`/playlist/${event._id}`}>See all</Link>

      <div>
        <h2>Location</h2>
        <MapEvent event={event} />
      </div>
    </div>
  );
}

export default EventDetail;
