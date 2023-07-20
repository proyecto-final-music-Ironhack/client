/* eslint-disable react/jsx-key */
<<<<<<< HEAD
import { Box, Heading } from "@chakra-ui/react";
=======
import { Box, Button, Flex, Heading, Image, Alert, AlertIcon } from "@chakra-ui/react";
>>>>>>> c54797516ed036d86f4d9cd873baa3f6f58c6e55
import { useEffect, useState } from "react";
import playlistService from "../../services/playlist.service";
import PlaylistSelector from "./PlaylistSelector";

const PlaylistsName = ({ eventId }) => {
  const [playlistsName, setPlaylistName] = useState([]);

  const allPlaylists = async () => {
    try {
      const { data } = await playlistService.getPlaylists();
      setPlaylistName(data);
      console.log(data);
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
    <>
      <Box>
        <Heading as="h1" size="lg" mb={20}>
          ADD A PLAYLIST:
        </Heading>

        {playlistsName.items?.map((playlist) => {
          return (
            <div key={playlist._id}>
              <PlaylistSelector {...playlist} eventId={eventId} />
            </div>
          );
        })}
      </Box>
    </>
  );
};

export default PlaylistsName;
