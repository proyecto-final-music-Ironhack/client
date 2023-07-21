/* eslint-disable react/jsx-key */
import { Box, Container, Heading } from "@chakra-ui/react";
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
      <Container>
        <Heading mb="10px">Choose one of your playlists:</Heading>

        {playlistsName.items?.map((playlist) => {
          return (
            <div key={playlist._id}>
              <PlaylistSelector {...playlist} eventId={eventId} />
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default PlaylistsName;
