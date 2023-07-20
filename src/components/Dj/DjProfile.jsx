import { useEffect, useState } from "react";
import djService from "../../services/dj.service";
import { Link } from "react-router-dom";
import eventService from "../../services/event.service";
import EventCardDj from "./EventCardDj";
import { Container, Image, Heading, Text, Button, Flex, Box } from "@chakra-ui/react";

export default function DjProfile({ djId, dj }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(0);
  const [djEvents, setDjEvents] = useState([]);

  const allEvents = async () => {
    try {
      const { data } = await eventService.getAllEvent();
      const djEventsData = data.filter((event) => event.dj?._id == (djId || dj?._id));
      setDjEvents(djEventsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setShowFollowers(dj?.followers);
    allEvents();
  }, [dj]);

  const handleFollow = async () => {
    if (djId) {
      try {
        const incrementFollowers = !isFollowing;
        if (incrementFollowers) {
          await djService.addFollower(djId);
          setShowFollowers((num) => num + 1);
        } else {
          await djService.removeFollower(djId);
          setShowFollowers((num) => num - 1);
        }
        setIsFollowing(incrementFollowers);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    dj && (
      <Container>
        <Image src={dj.image} alt="DjImg" />
        <Heading mt="20px">{dj.username}</Heading>
        <Text size="md">DJ</Text>
        {djId && djId !== djId._id && (
          <Button mt="20px" mb="20px" className="main-button" type="submit" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}

        <Flex justifyContent='center' alignItems='center' mb="20px">
          <Flex flexDirection="column" justifyContent='center' alignItems='center' pr="20px" borderRight='1px solid white'>
            <Text>{showFollowers}</Text>
            <Text color='gray'>followers</Text>
          </Flex>
          <Flex flexDirection="column" justifyContent='center' pl="20px" alignItems='center'>
            <Text>{djEvents.length}</Text>
            <Text color='gray' >event (s)</Text>
          </Flex>
        </Flex>
        <hr />
        <Heading size="md" mt="10px">Next Events:</Heading>
        <div>
          {djEvents.map((event) => (
            <div key={event._id}>
              <EventCardDj {...event} />
            </div>
          ))}
        </div>
        <br />
      </Container>
    )
  );
}
