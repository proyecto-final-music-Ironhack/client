import { Card, Heading, Flex, Text, Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import location from "../../images/icons/location.svg";
import addplaylist from "../../images/icons/add-to-playlist.svg";

const EventCardDj = ({ name, disco, date, _id, playlist }) => {
  const dateEvent = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  const timeEvent = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  return (
    <Card
      bgGradient="linear(to-r, #A7A7A7 0%, #0A0A0A 100%)"
      p="10px"
      mt="10px"
      mb="10px"
    >
      <Flex alignItems="center">
        <Card p="10px" bgGradient="linear(to-r, #A7A7A7 0%, #0A0A0A 100%)">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading size="md">{dateEvent}</Heading>
            <Text> {timeEvent}</Text>
          </Flex>
        </Card>

        <Box ml="20px">
          <Text>{name}</Text>
          <Flex>
            <Image src={location} alt="location-icon" />
            <Text fontSize="xs">{disco.name}</Text>
          </Flex>
          {!playlist || playlist.length == 0 ? (
            <Flex>
              <Image src={addplaylist} alt="location-icon" />
              <Text fontSize="xs" textDecoration="underline">
                {" "}
                <Link to={`/playlists-list/${_id}`}> Choose playlist</Link>{" "}
              </Text>
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </Card>
  );
};

export default EventCardDj;
