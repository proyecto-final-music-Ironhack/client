export default function EventCardDisco({ name, dj, date }) {
  console.log(date);
  const timeEvent = new Date(date).toLocaleTimeString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const dateTime = new Date(date).toLocaleDateString("en-EN", {
    day: "2-digit",
    month: "long",
    timeZone: "UTC",
  });

  return (
    <>
      <h1>{name}</h1>
      <p>{dj?.name}</p>
      <p>
        {dateTime} - {timeEvent}
      </p>
    </>
  );
}
