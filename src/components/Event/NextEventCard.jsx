export default function NextEventCard({ name, dj, date }) {
  console.log(dj);

  const displayEventDate = () => {
    return new Date({date}).toLocaleDateString()
  }

  return (
    <>
      <h1>{name}</h1>
      <p>{dj?.name}</p>
      <p>{displayEventDate()}</p>
    </>
  );
}
