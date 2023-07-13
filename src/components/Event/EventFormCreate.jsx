import { useEffect, useState } from "react";
import eventService from "../../services/event.service";
import { Button, FormControl, FormLabel, Input, Select, Box } from "@chakra-ui/react";
import djService from "../../services/dj.service";
import discoService from "../../services/disco.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export default function CreateEventForm() {
  const { user } = useContext(AuthContext);
  const [allDjs, setAllDjs] = useState([]);
  const [allDiscos, setAllDiscos] = useState([]);
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    startTime: "",
    priceOfEntry: "",
    drinksWithEntry: "",
    dj: "",
    disco: "",
    genre: "",
  });

  const getDjs = async () => {
    try {
      const res = await djService.getAllDjs();
      setAllDjs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDjs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await eventService.createEvent(eventData);
      console.log(response.data);
      setEventData({
        name: "",
        date: "",
        startTime: "",
        priceOfEntry: "",
        drinksWithEntry: "",
        dj: "",
        disco: "",
        genre: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const genres = ["Jazz", "Soul", "Pop", "Rock and Roll", "Techno", "Reggeaton", "Hip Hop/Rap", "Funk", "Metal", "Salsa", "Country"];

  return (
    <>
      <Box boxSize="300px">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name of the event:</FormLabel>
            <Input type="text" value={eventData.name} onChange={(e) => setEventData({ ...eventData, name: e.target.value })} />
          </FormControl>

          <FormControl>
            <FormLabel>Date:</FormLabel>
            <Input type="date" value={eventData.date} onChange={(e) => setEventData({ ...eventData, date: e.target.value })} />
          </FormControl>

          <FormControl>
            <FormLabel>Time: </FormLabel>
            <Input type="text" value={eventData.startTime} onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })} />
          </FormControl>

          <FormControl>
            <FormLabel>Ticket: </FormLabel>
            <Input type="number" value={eventData.priceOfEntry} onChange={(e) => setEventData({ ...eventData, priceOfEntry: e.target.value })} />
          </FormControl>

          <FormControl>
            <FormLabel>Drinks with ticket: </FormLabel>
            <Input
              type="number"
              value={eventData.drinksWithEntry}
              onChange={(e) => setEventData({ ...eventData, drinksWithEntry: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Hosted DJ:</FormLabel>
            <Select placeholder="Select option" value={eventData.dj} onChange={(e) => setEventData({ ...eventData, dj: e.target.value })}>
              {allDjs.map((dj) => {
                return (
                  <option key={dj._id} value={dj._id}>
                    {dj.username}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Genre:</FormLabel>
            <Select placeholder="Select option" value={eventData.genre} onChange={(e) => setEventData({ ...eventData, genre: e.target.value })}>
              {genres.map((genre, index) => {
                return (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <Button type="submit">Add event</Button>
        </form>
      </Box>
    </>
  );
}
