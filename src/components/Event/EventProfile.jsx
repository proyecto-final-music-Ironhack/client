import { useEffect, useState } from "react";
import eventService from "../../services/event.service";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Map from "../../components/MapEvent";

function EventProfile() {
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

  const formattedDate = format(new Date(event.date), "EEE, d MMM - hh:mma");

  return (
    <div>
      <h1>{event.name}</h1>
      <h2>
        {event.disco ? event.disco.name : "No disco information available"}
      </h2>
      <h2>{event.dj ? event.dj.username : "No DJ information available"}</h2>
      <p>{formattedDate}</p>
      <p>{event.priceOfEntry} €</p>
      <div>
        <h2>Now Playing</h2>
        <p>
          Have a look at what the DJ is playing and <span>check in</span> to
          vote for the next songs
        </p>
        <div style={{ color: "red" }}>AQUI VA LA CANCION QUE ESTA SONANDO</div>
      </div>

      <h3>Up next</h3>
      <p style={{ color: "red" }}>
        AQUI VA UN SCROLL DE LAS CANCIONES DE LA PLAYLIST
      </p>
      <p>
        check in to see whitch songs are up next at the disco, vote and suggest
        your favorite ones
      </p>

      <div>
        <h2>Location</h2>
        <Map />
      </div>
    </div>
  );
}

export default EventProfile;
