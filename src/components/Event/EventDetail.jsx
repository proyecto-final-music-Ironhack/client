import { useEffect, useState, useContext } from "react";
import { Button, Spinner, Container, Heading, Text, Flex, Center, Image } from "@chakra-ui/react";
import eventService from "../../services/event.service";
import userService from "../../services/user.service";
import { useParams, Link } from "react-router-dom";
import MapEvent from "../Maps/MapEvent";
import TrackCard from "../Playlist/TrackCard";
import header from "../../images/event-image.png";
import { AuthContext } from "../../context/auth.context";
import imgTicket from "../../images/icons/money.svg";

function EventDetail() {
  const [event, setEvent] = useState(null);
  const [eventTracks, setEventTracks] = useState(null);
  const [CheckedIn, setCheckedIn] = useState(false);
  const [likeButton, showLikeButton] = useState(true);
  const { user, hasChanged, setHasChanged } = useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const { data } = await eventService.getOneEvent(id);
        const tracks = data.playlist.sort((a, b) => {
          return b.likes.length - a.likes.length;
        });
        setEvent(data);
        setEventTracks(tracks);
        setCheckedIn(user.attendedEvents.some((ev) => ev._id === data._id));
      } catch (err) {
        console.error(err);
      }
    };
    getEvent();
  }, [id, user]);

  const nowPlayingTrack = eventTracks?.[0];

  const getTracks = () => {
    return eventTracks.slice(1, 3).map((track) => {
      return <TrackCard key={track._id} {...track} userId={user._id} showLikeButton={false} />;
    });
  };

  const pushAttendedEvent = async () => {
    try {
      await userService.pushEvent(event._id);
      setCheckedIn(user.attendedEvents.some((ev) => ev._id === event._id));
      setHasChanged(!hasChanged);
    } catch (error) {
      console.error(error);
    }
  };
  const formattedDate = event
    ? new Date(event.date).toLocaleDateString("en", {
        day: "2-digit",
        month: "short",
      })
    : "";

  const formattedTime = event
    ? new Date(new Date(event.date).getTime() - 2 * 60 * 60 * 1000).toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  if (!event) {
    return (
      <div>
        <Link to="/events">No event found, sorry. Go to Home</Link>
      </div>
    );
  }

  const now = new Date();
  const eventDate = new Date(event.date);
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  return (
    <>
      <Container p="0px">
        <Image src={header} h="200px" w="500px" mb="20px" />
      </Container>
      <Container>
        <Heading>{event.name}</Heading>
        <Heading as="span" size="md">
          {" "}
          Club:{" "}
        </Heading>
        <Text as="span">
          <Link to={`/disco/${event.disco._id}`}>{event.disco ? event.disco.name : "No disco information available"}</Link>
        </Text>{" "}
        <br />
        <Heading as="span" size="md">
          {" "}
          Hosted DJ:{" "}
        </Heading>
        <Text as="span">
          {" "}
          <Link to={`/dj/${event.dj._id}`}>{event.dj ? event.dj.username : "No DJ information available"}</Link>
        </Text>
        <Text mt={5}>
          {formattedDate} - {formattedTime}
        </Text>
        <Text>
          <Flex flexDirection={"row"}>
            <img src={imgTicket} alt="img-ticket" />
            {event.priceOfEntry} €
          </Flex>
        </Text>
        <Text mb={"20px"}>🍸{event.drinksWithEntry}</Text>
        {eventDate >= now && eventDate <= twoHoursLater ? (
          <>
            <Center>
              {user.savedSongs && (
                <Button mb="20px" mt="20px" className="main-button" onClick={pushAttendedEvent}>
                  {CheckedIn ? "Checked In" : "Check In"}
                </Button>
              )}
            </Center>
            <hr />
            <Heading mt="10px">Now Playing</Heading>
            <Text>
              Have a look at what the DJ is playing and <span className="lime-span">check in</span> to vote for the next songs
            </Text>
            {event.playlist ? <TrackCard key={nowPlayingTrack?._id} {...nowPlayingTrack} userId={user?._id} showLikeButton={false} /> : <Spinner />}
            <hr />
            <Heading size="md" mt="10px">
              Up next
            </Heading>
            {eventTracks ? getTracks() : <Spinner />}
            <Text fontSize="sm" textAlign="center">
              check in to see which songs are up next at the disco, vote and suggest your favorite ones
            </Text>
            <Flex mt="6px" justifyContent={"center"}>
              {CheckedIn && (
                <Link className="main-link" to={`/playlist/${event._id}`}>
                  See all
                </Link>
              )}
            </Flex>
          </>
        ) : (
          <Text fontSize="xs" color="gray" mt="20px" mb="20px">
            Check in and vote your favorite songs at the time of the party!
          </Text>
        )}
        <hr />
        <Heading size="mb" mt="10px">
          Location
        </Heading>
        <Text mb="10px">
          <address>{event.disco.address}</address>
        </Text>
        <MapEvent event={event} mb="20px" />
      </Container>
    </>
  );
}

export default EventDetail;
