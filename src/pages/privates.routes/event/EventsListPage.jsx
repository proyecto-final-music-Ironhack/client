import Map from "../../../components/Maps/Map";
import SearchEvent from "../../../components/Event/SearchEvent";
import { Container, Text, Heading } from "@chakra-ui/react";

export default function EventsListPage() {
  return (
    <>
      <Container pr="0" pl="0">
        <Heading p="25px" size="md">
          Find events in your area
        </Heading>
        <Map />
      </Container>
      <Container>
        <SearchEvent />
      </Container>
    </>
  );
}
