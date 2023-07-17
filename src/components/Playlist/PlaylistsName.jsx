/* eslint-disable react/jsx-key */
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import playlistService from "../../services/playlist.service";

const PlaylistsName = (eventId) => {

  const [playlistsName, setPlaylistName] = useState([]);

  const allPlaylists = async () => {
    try {
      const resData = await playlistService.getPlaylists();
      setPlaylistName(resData.data);
      console.log(resData.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      allPlaylists();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Box>
      <Heading as="h1" size="lg" mb={20}>
        ADD A PLAYLIST:
      </Heading>
      {playlistsName.items?.map((playlistItems) => {
        return (
          <Flex align="center" my={10}>
            <Image
              boxSize="60px"
              src={playlistItems.images[0].url}
              alt=""
              mr={3}
            />
            <Heading as="h1" key={playlistItems.id} size="md">
              {playlistItems.name}
            </Heading>
            <Button> ADD </Button>
          </Flex>
        );
      })}
    </Box>
  );
};

export default PlaylistsName;
