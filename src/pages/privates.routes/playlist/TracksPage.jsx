import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import eventService from "../../../services/event.service";
import { Spinner } from "@chakra-ui/react";

import TrackCard from "../../../components/Playlist/TrackCard";

function TracksPage() {
  const { eventId } = useParams();
  const [eventTracks, setEventTracks] = useState(null);

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
  }, [eventId]);

  const get3Tracks = () => {
    return eventTracks.slice(0, 3).map((track) => {
      return <TrackCard key={track._id} {...track} />;
    });
  };

  const getRestOfTracks = () => {
    return eventTracks.slice(3, 9).map((track) => {
      return <TrackCard key={track._id} {...track} />;
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
