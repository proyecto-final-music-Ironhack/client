import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import playlistService from "../../services/playlist.service";

export default function PlaylistSelector({ images, id, name, eventId }) {
  console.log("HELLO", id);
  console.log("EVENT ID", eventId);

  const pushTracksToEvent = async () => {
    try {
      await playlistService.getPlaylistId(id, eventId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex align="center" my={10}>
      <Image boxSize="60px" src={images[0].url} alt="" mr={3} />
      <Heading as="h1" size="md">
        {name}
      </Heading>
      <Button onClick={pushTracksToEvent}> ADD </Button>
    </Flex>


    
  );
}
