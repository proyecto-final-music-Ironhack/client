import Map from "../../../components/Maps/Map";
import SearchEvent from "../../../components/Event/SearchEvent";
import { Container } from "@chakra-ui/react";

export default function EventsListPage() {
  return (
    <Container maxHeight="100vh" className="bg-black" p="30px">
      <h1>Find events in your area</h1>
      <Map />
      <SearchEvent />
    </Container>
  );
}
