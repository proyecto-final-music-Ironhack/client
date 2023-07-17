import PlaylistsName from "../../../components/Playlist/PlaylistsName";
import { useParams } from "react-router-dom";

const PlaylistOfListPage = () => {

const {eventId} = useParams();

console.log('EVENT ID', eventId)

  return (
    <>
      <PlaylistsName eventId={eventId}/>
    </>
  );
};

export default PlaylistOfListPage;
