import { useEffect, useState } from "react";
import discoService from "../../services/disco.service";
import { useParams } from "react-router-dom";

export default function DiscoProfile() {
  const [disco, setDisco] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchDisco = async () => {
      try {
        const response = await discoService.getOneDisco(id);
        setDisco(response.data);
        setFollowers(response.data.followers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDisco();
  }, [id]);

  const handleFollow = async () => {
    try {
      const incrementFollowers = !isFollowing;
      let newFollowers;
      if (incrementFollowers) {
        newFollowers = await discoService.addFollower(id);
      } else {
        newFollowers = await discoService.removeFollower(id);
      }
      setFollowers(newFollowers);
      setIsFollowing(incrementFollowers);
    } catch (err) {
      console.log(err);
    }
  };

  if (!disco) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img style={{ width: "100%" }} src={disco.image} alt="DiscoImg" />
      <h1>{disco.name}</h1>
      <h2>Disco</h2>
      {id && (
        <button type="submit" onClick={handleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
      <div>
        <p>
          <span>{followers}</span> followers
        </p>
      </div>
    </div>
  );
}
