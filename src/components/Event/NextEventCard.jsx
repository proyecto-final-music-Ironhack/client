export default function NextEventCard({ name, dj, date }) {
  console.log(dj);

  return (
    <>
      <h1>{name}</h1>
      <p>{dj?.name}</p>
      <p>{date}</p>
    </>
  );
}
