export default function EventCardDisco({ name, dj, date }) {
  const dateEvent = new Date(date).toLocaleDateString("en", {
    day: "numeric",
    month: "short",
  });

  const timeEvent = new Date(date).toLocaleTimeString("es", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <h1>{name}</h1>
      <p>{dj?.name}</p>
      <p>
        {dateEvent} - {timeEvent}
      </p>
    </>
  );
}
