import { useEffect, useState } from "react";
import UserProfile from "../../../components/User/UserProfile";
import userService from "../../../services/user.service";

export const UserPage = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const { data } = await userService.getUser();
      console.log(data);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <UserProfile user={user} />;
};
