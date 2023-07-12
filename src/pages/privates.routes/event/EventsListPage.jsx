import Map from "../../../components/Maps/Map";
import SearchEvent from "../../../components/Event/SearchEvent";

export default function EventsListPage() {
  return (
    <div>
      <h1>Find events in your area</h1>
      <Map />
      <SearchEvent />
    </div>
  );
}
