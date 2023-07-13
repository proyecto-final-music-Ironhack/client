import { useEffect, useState } from "react";
import DiscoProfile from "../../components/Disco/DiscoProfile";
import { useParams } from "react-router-dom";
import discoService from "../../services/disco.service";

export const DiscoPage = () => {
  const [disco, setDisco] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const { id } = useParams();

  const getDisco = async () => {
    try {
      const { data } = await discoService.getOneDisco(id);
      setDisco(data);
      setFollowers(data.followers);
      setIsFollowing(data.isFollowing);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDisco();
  }, [id]);

  return (
    <DiscoProfile
      id={id}
      disco={disco}
      followers={followers}
      isFollowing={isFollowing}
    />
  );
};
