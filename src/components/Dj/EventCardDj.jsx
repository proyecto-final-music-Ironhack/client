import { Link } from "react-router-dom";

const EventCardDj = ({ name, disco, date, _id, playlist }) => {
  const dateEvent = new Date(date).toLocaleDateString("en", {
    day: "numeric",
    month: "short",
  });
  const timeEvent = new Date(date).toLocaleTimeString("en", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <h1>{name}</h1>
      <p>
        {dateEvent} - {timeEvent}
      </p>
      <p>{disco.name}</p>
      {!playlist || playlist.length == 0 ? <Link to={`/playlists-list/${_id}`}>Choose playlist</Link> : null }
    </>
  );
};

export default EventCardDj;
