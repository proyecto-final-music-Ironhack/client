import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import eventService from "../../services/event.service";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import MapEvent from "../Maps/MapEvent";

function EventDetail() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  const getEvent = async () => {
    try {
      const res = await eventService.getOneEvent(id);
      setEvent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEvent();
  }, [id]);

  if (!event) {
    return (
      <div>
        <Link to="/events">No event found, sorry. Go to Home</Link>
      </div>
    );
  }

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
        <div style={{ color: "red" }}>AQUI VA LA CANCION QUE ESTA SONANDO</div>
      </div>

      <h3>Up next</h3>
      <p style={{ color: "red" }}>AQUI VA UN SCROLL DE LAS CANCIONES DE LA PLAYLIST</p>
      <Link to={`/playlist/${event._id}`}>See all</Link>
      <p>check in to see whitch songs are up next at the disco, vote and suggest your favorite ones</p>

      <div>
        <h2>Location</h2>
        <MapEvent event={event} />
      </div>
    </div>
  );
}

export default EventDetail;
