import { useEffect, useState } from "react";
import discoService from "../../services/disco.service";
import { Link } from "react-router-dom";
import EventCardDisco from "./EventCardDisco";
import mostplayed from "../../images/most-played.png";
import { Container, Text, Image, Heading, Flex, Button, Center } from "@chakra-ui/react";

export default function DiscoProfile({ disco, discoId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(0);

  useEffect(() => {
    setShowFollowers(disco?.followers);
  }, [disco]);

  const handleFollow = async () => {
    if (discoId) {
      try {
        const incrementFollowers = !isFollowing;
        if (incrementFollowers) {
          await discoService.addFollower(discoId);
          setShowFollowers((num) => num + 1);
        } else {
          await discoService.removeFollower(discoId);
          setShowFollowers((num) => num - 1);
        }
        setIsFollowing(incrementFollowers);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getDiscoEvents = () => {
    return disco.events.map((event) => {
      return (
        <div key={event._id}>
          <EventCardDisco {...event} />
        </div>
      );
    });
  };

  return (
    disco && (
      <Container>
        <Image src={disco.image} alt="DiscoImg" />
        <Heading mt="20px">{disco.name}</Heading>
        <Text size="md">Disco</Text>

        {discoId && discoId !== discoId._id && (
          <Button mt="20px" mb="20px" className="main-button" type="submit" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}

        <Flex justifyContent="center" alignItems="center" mb="20px">
          {disco.followers && (
            <Flex flexDirection="column" justifyContent="center" alignItems="center" pr="20px" borderRight="1px solid white">
              <Text>{showFollowers}</Text>
              <Text color="gray">followers</Text>
            </Flex>
          )}

          <Flex flexDirection="column" justifyContent="center" pl="20px" alignItems="center">
            <Text>{disco.events.length}</Text>
            <Text color="gray">event (s)</Text>
          </Flex>
        </Flex>
        <Image mt="20px" mb="20px" src={mostplayed} alt="Most Played" />
        <hr />
        <Heading size="md" mt="10px">
          Hosted Events:
        </Heading>

        {disco.events ? getDiscoEvents() : <p>Not events yet</p>}
        <Center mt="20px" mb="20px">
          {!discoId && (
            <Link className="main-link"  to="/events/create">
              Create new event
            </Link>
          )}
        </Center>
      </Container>
    )
  );
}
