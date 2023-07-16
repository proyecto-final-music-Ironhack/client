import { Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = ({ user }) => {
  return (
    <>
      <h1>{user.name}</h1>

      <Link to={`/user-edit/${user._id}`}>Edit profile</Link>
    </>
  );
};

export default UserProfile;
