import { Link } from "react-router-dom";

const EventCardDj = ({ name, disco, date, _id, playlist }) => {
  console.log(name);
  const dateEvent = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  const timeEvent = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  return (
    <>
      <h1>{name}</h1>
      <p>
        {dateEvent} - {timeEvent}
      </p>
      <p>{disco.name}</p>
      {!playlist || playlist.length == 0 ? (
        <Link to={`/playlists-list/${_id}`}>Choose playlist</Link>
      ) : null}
    </>
  );
};

export default EventCardDj;
