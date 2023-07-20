import { Link } from "react-router-dom";
import eventService from "../../services/event.service";
import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Input,
  Select,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import headphones from "../../images/icons/headphones.svg";
import locationImg from "../../images/icons/location.svg";
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
    <Container maxHeight="100vh" className="bg-black" p="30px">
      <Flex>
        <Input
          height={"31.5px"}
          type="text"
          w={"160px"}
          size={"sm"}
          placeholder={"Search an event"}
          bg={"#A7A7A7"}
          borderLeftRadius={"50px"}
          _placeholder={{ color: "#FFF" }}
          value={search}
          borderColor={"black"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Text>
          <Select
            height={"30px"}
            bg={"#A7A7A7"}
            borderColor={"black"}
            borderRightRadius={"50px"}
            size={"sm"}
            w={"112px"}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option style={{ background: "#A7A7A7" }} value="">
              All Genres
            </option>
            <option style={{ background: "#A7A7A7" }} value="Rock">
              Rock
            </option>
            <option style={{ background: "#A7A7A7" }} value="Pop">
              Pop
            </option>
            <option style={{ background: "#A7A7A7" }} value="Reggeaton">
              Reggeaton
            </option>
            <option style={{ background: "#A7A7A7" }} value="Techno">
              Techno
            </option>
            <option style={{ background: "#A7A7A7" }} value="Funk">
              Funk
            </option>
            <option style={{ background: "#A7A7A7" }} value="Metal">
              Metal
            </option>
            <option style={{ background: "#A7A7A7" }} value="Salsa">
              Salsa
            </option>
            <option style={{ background: "#A7A7A7" }} value="Jazz">
              Jazz
            </option>
            <option style={{ background: "#A7A7A7" }} value="Country">
              Country
            </option>
          </Select>
        </Text>
      </Flex>
      <br />
      <Text>Around me</Text>
      {filterEvent.map((event) => {
        const date = new Date(event.date);
        date.setHours(date.getHours() - 2);
        return (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            borderRadius="10px"
            bgGradient="linear(to-r, #A7A7A7 0%, #0A0A0A 100%)"
            p="10px"
            mt="10px"
            mb="10px"
            color={"white"}
            key={event._id}
          >
            <Link to={`/event/${event._id}`}>
              <Flex
                flexDirection={"row"}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  mr={"8px"}
                  src={event.dj.image}
                  borderRadius={"full"}
                  style={{ width: "64px", height: "64px" }}
                />
                <Flex flexDirection={"column"}>
                  <h2>{event.name}</h2>
                  <p className="size-date">
                    {date.toLocaleDateString("en", {
                      month: "short",
                      day: "2-digit",
                    })}{" "}
                    -{" "}
                    {date.toLocaleTimeString("en", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <Flex flexDirection={"row"}>
                    <img src={locationImg} alt="" />
                    <p>
                      {event.disco
                        ? event.disco.name
                        : "No disco information available"}
                    </p>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <img src={headphones} alt="" />
                    <h3>
                      {event.dj
                        ? event.dj.username
                        : "No DJ information available"}{" "}
                      , {event.genre}
                    </h3>
                  </Flex>
                </Flex>
              </Flex>
            </Link>
          </Card>
        );
      })}
    </Container>
  );
}
