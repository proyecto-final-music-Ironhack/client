import { Link } from "react-router-dom";
const EventCardDj = ({ name, disco, date, _id }) => {
  const dateEvent = new Date(date).toLocaleDateString("es", {
    day: 'numeric',
    month: 'short',
  });
  return (
    <>
      <h1>{name}</h1>
      <p>{dateEvent}</p>
      <p>{disco.name}</p>
      <Link to={`/playlists-list/${_id}`}>Choose playlist</Link>
    </>
  );
};

export default EventCardDj;
