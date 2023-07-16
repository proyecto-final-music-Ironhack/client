export default function EventCardDisco({ name, dj, date }) {
  const dateEvent = new Date(date).toLocaleDateString("es", {
    day: 'numeric',
    month: 'short',
  });

  return (
    <>
      <h1>{name}</h1>
      <p>{dj?.name}</p>
      <p>{dateEvent}</p>
    </>
  );
}
