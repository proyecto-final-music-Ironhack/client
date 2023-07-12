import Mapbox from "../../../components/Map";
import SearchEvent from "../../../components/SearchEvent";

export default function EventsListPage() {
  return (
    <div>
      <h1>Find events in your area</h1>
      <Mapbox />
      <SearchEvent />
    </div>
  );
}
