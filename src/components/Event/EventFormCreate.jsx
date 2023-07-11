import { useState } from "react";
import eventService from "../../services/event.service";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function CreateEventForm() {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    dj: "",
    disco: "",
    genre: [String],
  });
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
    <FormControl onSubmit={handleSubmit}>
      <FormLabel>
        Name of the event:
        <Input
          type="text"
          value={eventData.name}
          onChange={(e) => setEventData(e.target.value)}
        />
      </FormLabel>
      <FormLabel>
        Date of the event:
        <Input
          type="date"
          value={eventData.date}
          onChange={(e) => setEventData(e.target.value)}
        />
      </FormLabel>
      <FormLabel>
        Dj:
        <Input
          type="String"
          value={eventData.dj}
          onChange={(e) => setEventData(e.target.value)}
        />
      </FormLabel>
      <Button type="submit">Create event</Button>
    </FormControl>
  );
}
