import DiscoProfile from "../../components/Disco/DiscoProfile";
import DjProfile from "../../components/Dj/DjProfile";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  console.log("HEllO", user.idFromAPI);

  return (
    <>
      {user.idFromAPI && <DiscoProfile disco={user} />}
      {user.attendedEvents && <DjProfile />}
    </>
  );
}
