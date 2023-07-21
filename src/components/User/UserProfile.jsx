import { Image, Container, Text, Spinner, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EventCardDisco from "../Disco/EventCardDisco";

const UserProfile = ({ user }) => {
  const getAttendedEvents = () => {
    return user.attendedEvents.map((event) => {
      return (
        <div key={event._id}>
          <EventCardDisco {...event} />
        </div>
      );
    });
  };

  return (
    <>
      <Container centerContent>
          <Image mb="20px" boxSize="150px" borderRadius={500} src={user.image} />
          <Heading size="md">{user.name}</Heading>
          <Text>@{user.username}</Text>
          <Link className="main-link" to={`/user-edit/${user._id}`}>Edit profile</Link>
      </Container>
      <hr />
      <Container mt="10px">
          <Heading size="lg">Attended Events:</Heading>
          {user.attendedEvents ? getAttendedEvents() : <Spinner />}
      </Container>
    </>
  );
};

export default UserProfile;
