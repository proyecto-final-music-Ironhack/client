import { Link } from "react-router-dom";
const EventCardDj = ({ name, disco, date }) => {
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
      <Link to="/playlists-list">Add Playlist</Link>
    </>
  );
};

export default EventCardDj;
