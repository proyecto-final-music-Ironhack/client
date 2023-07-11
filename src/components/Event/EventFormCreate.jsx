import { useEffect, useState } from "react";
import eventService from "../../services/event.service";
import { Button, FormControl, FormLabel, Input, Select, Box } from "@chakra-ui/react";
import djService from "../../services/dj.service";
import discoService from "../../services/disco.service";


export default function CreateEventForm() {
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
    genre: [String],
  });

  const getDjs = async () => {
    try {
      const res = await djService.getAllDjs();
      setAllDjs(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDiscos = async () => {
    try {
      const res = await discoService.getAllDiscos();
      setAllDiscos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDjs();
    getDiscos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await eventService.createEvent(eventData);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Box boxSize="300px">
      <form onSubmit={handleSubmit}>
        <FormControl >
          <FormLabel>Name of the event:</FormLabel>
          <Input type="text" value={eventData.name} onChange={(e) => setEventData(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Date:</FormLabel>
          <Input type="date" value={eventData.date} onChange={(e) => setEventData(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Time: </FormLabel>
          <Input type="text" value={eventData.startTime} onChange={(e) => setEventData(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Price of entry: </FormLabel>
          <Input type="number" value={eventData.priceOfEntry} onChange={(e) => setEventData(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Drinks with entry: </FormLabel>
          <Input type="number" value={eventData.drinksWithEntry} onChange={(e) => setEventData(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Hosted DJ:</FormLabel>
          <Select placeholder="Select option">
            {allDjs.map((dj) => {
              return (
                <option key={dj._id} value={eventData.dj}>
                  {dj.username}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <FormControl >
          <FormLabel>Location</FormLabel>
          <Select placeholder="Select option"> 
            {allDiscos.map((disco) => {
              return (
                <option key={disco._id} value={eventData.disco}>
                  {disco.name}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <Button type="submit">Create event</Button>
      </form>
      </Box>
    </>
  );
}
