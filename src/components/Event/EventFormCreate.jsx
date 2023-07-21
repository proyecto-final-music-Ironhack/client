import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventService from "../../services/event.service";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Container,
  Text,
  Heading,
} from "@chakra-ui/react";
import djService from "../../services/dj.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export default function CreateEventForm() {
  const navigate = useNavigate();
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
      console.error(error);
    }
  };

  useEffect(() => {
    getDjs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await eventService.createEvent(eventData);
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
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  const genres = [
    "Jazz",
    "Soul",
    "Pop",
    "Rock and Roll",
    "Techno",
    "Reggeaton",
    "Hip Hop/Rap",
    "Funk",
    "Metal",
    "Salsa",
    "Country",
  ];
console.log('HEY', eventData.date);
  return (
    <Container>
      <Heading mt="20px" mb="10px"> Create a new event for your club:</Heading>
      <hr />
      <Text>
        <Box boxSize="300px"  mt="20px">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Name of the event:</FormLabel>
              <Input
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                type="text"
                value={eventData.name}
                onChange={(e) =>
                  setEventData({ ...eventData, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Date and time:</FormLabel>
              <Input
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                type="datetime-local"
                value={eventData.date}
                onChange={(e) =>
                  setEventData({ ...eventData, date: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Ticket: </FormLabel>
              <Input
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                type="number"
                value={eventData.priceOfEntry}
                onChange={(e) =>
                  setEventData({ ...eventData, priceOfEntry: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Drinks with ticket: </FormLabel>
              <Input
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                type="number"
                value={eventData.drinksWithEntry}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    drinksWithEntry: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Hosted DJ:</FormLabel>
              <Select
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"black"}
                placeholder="Select option"
                value={eventData.dj}
                onChange={(e) =>
                  setEventData({ ...eventData, dj: e.target.value })
                }
              >
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
              <Select
                bgColor={"black"}
                borderColor={"#CAFA00"}
                color={"white"}
                placeholder="Select option"
                value={eventData.genre}
                onChange={(e) =>
                  setEventData({ ...eventData, genre: e.target.value })
                }
              >
                {genres.map((genre, index) => {
                  return (
                    <option key={index} value={genre}>
                      {genre}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <Button mt="20px" className="main-button" type="submit">
              Add event
            </Button>
          </form>
        </Box>
      </Text>
    </Container>
  );
}
