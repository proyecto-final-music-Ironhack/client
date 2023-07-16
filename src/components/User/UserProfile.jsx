<<<<<<< Updated upstream
const UserProfile = ({ user }) => {
  return (
    <>
      <h1>{user.name}</h1>
=======
import { Image, Container, Flex } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = ({ user }) => {
  return (
    <>
      <Container centerContent>
        <Image boxSize="150px" borderRadius={500} src={user.image} />
        <h1>{user.name}</h1>
        <p>@{user.username}</p>
        <Link to={`/user-edit/${user._id}`}>Edit profile</Link>
      </Container>
      <h1>Attended Events:</h1>
      <hr />
>>>>>>> Stashed changes
    </>
  );
};

export default UserProfile;
