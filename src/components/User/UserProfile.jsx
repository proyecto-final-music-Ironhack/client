import { Image, Container, Text, Spinner } from "@chakra-ui/react";
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
        <Text>
          <Image boxSize="150px" borderRadius={500} src={user.image} />
          <h1>{user.name}</h1>
          <p>@{user.username}</p>
          <Link to={`/user-edit/${user._id}`}>Edit profile</Link>
        </Text>
      </Container>
      <Text>
        <br />
        <h1>Attended Events:</h1>
        {user.attendedEvents ? getAttendedEvents() : <Spinner />}
        <hr />
      </Text>
    </>
  );
};

export default UserProfile;
