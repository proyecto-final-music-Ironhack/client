import DiscoDetail from "../../../components/Disco/Disco.Detail";
import { Link } from "react-router-dom";
export default function DiscoDetailPage() {
  return (
    <div>
      <DiscoDetail />
      <Link to="/events/create"> Create event</Link>
    </div>
  );
}
