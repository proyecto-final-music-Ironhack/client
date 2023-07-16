import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import eventService from "../../../services/event.service";
import { Spinner } from "@chakra-ui/react";

import TrackCard from "../../../components/Playlist/TrackCard";

function TracksPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const getEventPlaylist = async () => {
    try {
      const { data } = await eventService.getOneEvent(eventId);
      const tracks = data.playlist.sort((a, b) => {
        return b.likes.length - a.likes.length;
      });
      setEvent(tracks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEventPlaylist();
  }, [eventId]);

  const getTracks = () => {
    return event.map((track) => {
      return <TrackCard key={track._id} {...track} />;
    });
  };

  return <>{event ? getTracks() : <Spinner />}</>;
}

export default TracksPage;
