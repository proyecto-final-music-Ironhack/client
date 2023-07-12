import DiscoProfile from "../../../components/Disco/DiscoProfile";
import { Link } from "react-router-dom";
export default function DiscoDetailPage() {
  return (
    <div>
      <DiscoProfile />
      <Link to="/events/create"> Create event</Link>
    </div>
  );
}
