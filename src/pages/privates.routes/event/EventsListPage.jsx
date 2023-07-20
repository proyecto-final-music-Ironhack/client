import Map from "../../../components/Maps/Map";
import SearchEvent from "../../../components/Event/SearchEvent";
import { Container, Text } from "@chakra-ui/react";

export default function EventsListPage() {
  return (
    <Container maxHeight="100vh" className="bg-black" p="30px">
      <Text>Find events in your area</Text>
      <Map />
      <SearchEvent />
    </Container>
  );
}
