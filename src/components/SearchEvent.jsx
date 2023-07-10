import { Link } from "react-router-dom";
import eventService from "../services/event.service";
import { useEffect, useState } from "react";

export default function SearchEvent() {
  const [event, setEvent] = useState([]);
  const [search, setSearch] = useState("");
  const [filterEvent, setFilterEvent] = useState([]);

  const getEvent = async () => {
    try {
      const res = await eventService.getAllEvent();
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 8);

    setFilterEvent(
      event.filter((e) => {
        const eventDate = new Date(e.date);
        return (
          e.name.toLowerCase().includes(search.toLowerCase()) &&
          eventDate >= today &&
          eventDate <= sevenDaysLater
        );
      })
    );
  }, [search, event]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filterEvent.map((event) => (
        <div style={{ border: "5px solid white" }} key={event._id}>
          <Link to={`/event/${event._id}`}>
            <h2>{event.name}</h2>

            <p>{new Date(event.date).toLocaleDateString()}</p>
            <h3>
              {event.disco
                ? event.disco.name
                : "No disco information available"}
            </h3>
            <h3>{event.dj ? event.dj.name : "No DJ information available"}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
