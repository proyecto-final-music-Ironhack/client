const EventCardDj = ({ name, disco, date }) => {
  const dateEvent = new Date(date).toLocaleDateString("es", {
    day: 'numeric',
    month: 'short',
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
