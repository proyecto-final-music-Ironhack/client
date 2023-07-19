import { Link } from "react-router-dom";
import eventService from "../../services/event.service";
import { useEffect, useState } from "react";
import { Box, Input, VStack, Select, Text, Image } from "@chakra-ui/react";

export default function SearchEvent() {
  const [event, setEvent] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [filterEvent, setFilterEvent] = useState([]);

  const getEvent = async () => {
    try {
      const res = await eventService.getAllEvent();
      setEvent(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);
    setFilterEvent(
      event.filter((e) => {
        const eventDate = new Date(e.date);
        return (
          e.name.toLowerCase().includes(search.toLowerCase()) &&
          eventDate >= today &&
          eventDate <= sevenDaysLater &&
          (genre ? e.genre === genre : true)
        );
      })
    );
  }, [search, event, genre]);

  return (
    <div>
      <Input
        type="text"
        size="lg"
        variant="filled"
        placeholder={"Search an event"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">All Genres</option>
        <option value="Rock">Rock</option>
        <option value="Pop">Pop</option>
        <option value="Reggeaton">Reggeaton</option>
        <option value="Techno">Techno</option>
        <option value="Funk">Funk</option>
        <option value="Metal">Metal</option>
        <option value="Salsa">Salsa</option>
        <option value="Jazz">Jazz</option>
        <option value="Country">Country</option>
      </select>
      {filterEvent.map((event) => {
        const date = new Date(event.date);
        date.setHours(date.getHours() - 2);

        return (
          <div key={event._id}>
            <Link to={`/event/${event._id}`}>
              <h2>{event.name}</h2>
              <p>
                {new Date(event.date).toLocaleDateString("en")} -{" "}
                {date.toLocaleTimeString("en", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <h3>
                <Image
                  src="/app-music-client/src/images/icons/headphones.png"
                  boxSize="24px"
                  alt="DJ Icon"
                />

                {event.disco
                  ? event.disco.name
                  : "No disco information available"}
              </h3>
              <h3>
                {event.dj ? event.dj.username : "No DJ information available"}
              </h3>
              <img
                src={event.dj.image}
                style={{ height: "40px", width: "40px", borderRadius: "50%" }}
                className="img-style-dj"
                alt=""
              />
              <h3>{event.genre}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
