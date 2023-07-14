import DiscoProfile from "../../components/Disco/DiscoProfile";
import DjProfile from "../../components/Dj/DjProfile";
import UserProfile from "../../components/User/UserProfile";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.savedSongs && <UserProfile />}
      {user.idFromAPI && <DiscoProfile disco={user} />}
      {user.musicGenre && <DjProfile dj={user} />}
    </>
  );
}
