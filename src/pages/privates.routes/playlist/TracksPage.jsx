import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import eventService from "../../../services/event.service";
import { Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { AuthContext } from "../../../context/auth.context";
import TrackCard from "../../../components/Playlist/TrackCard";

function TracksPage() {
  const { eventId } = useParams();
  const [eventTracks, setEventTracks] = useState(null);
  const { user, hasChanged, setHasChanged } = useContext(AuthContext);

  const getEventPlaylist = async () => {
    try {
      const { data } = await eventService.getOneEvent(eventId);
      const tracks = data.playlist.sort((a, b) => {
        return b.likes.length - a.likes.length;
      });
      setEventTracks(tracks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEventPlaylist();
  }, [eventId, user, eventTracks]);

  const get3Tracks = () => {
    return eventTracks.slice(1, 4).map((track) => {
      return (
        <TrackCard
          key={track._id}
          {...track}
          userId={user._id}
          showLikeButton={true}
        />
      );
    });
  };

  const getRestOfTracks = () => {
    return eventTracks.slice(5, 10).map((track) => {
      return (
        <TrackCard
          key={track._id}
          {...track}
          userId={user._id}
          showLikeButton={true}
        />
      );
    });
  };

  return (
    <Container>
      <Heading>Up next</Heading>
      {eventTracks ? get3Tracks() : <Spinner />}
      <Heading size="md" mb="20px" mt="20px">
        Vote your favs:
      </Heading>
      <hr />
      {eventTracks ? getRestOfTracks() : <Spinner />}
    </Container>
  );
}

export default TracksPage;
