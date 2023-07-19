import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import eventService from "../../../services/event.service";
import { Spinner } from "@chakra-ui/react";
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
      console.log(err);
    }
  };

  useEffect(() => {
    getEventPlaylist();
  }, [eventId, user, eventTracks]);

  const get3Tracks = () => {
    return eventTracks.slice(1, 4).map((track) => {
      return <TrackCard key={track._id} {...track} userId={user._id} />;
    });
  };

  const getRestOfTracks = () => {
    return eventTracks.slice(5, 10).map((track) => {
      return <TrackCard key={track._id} {...track} userId={user._id} />;
    });
  };

  return (
    <>
      {eventTracks ? get3Tracks() : <Spinner />}
      <h2>Vote your favs:</h2>
      <hr />
      {eventTracks ? getRestOfTracks() : <Spinner />}
    </>
  );
}

export default TracksPage;
