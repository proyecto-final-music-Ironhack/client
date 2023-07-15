const EventCardDj = ({ name, disco, date }) => {
  const dateEvent = new Date(date).toLocaleTimeString("es", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <h1>{name}</h1>
      <p>{dateEvent}</p>
      <p>{disco.name}</p>
    </>
  );
};

export default EventCardDj;
