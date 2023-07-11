import { useEffect, useState } from "react";
import discoService from "../../services/disco.service";
import { useParams } from "react-router-dom";

export default function DiscoDetail() {
  const [disco, setDisco] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const { id } = useParams();

  const getDisco = async () => {
    try {
      const res = await discoService.getOneDisco(id);
      setDisco(res.data);
      setFollowers(res.data.followers);
      setIsFollowing(res.data.isFollowing);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
      const incrementFollowers = !isFollowing;
      const dataDisco = await discoService.updateDisco(id, incrementFollowers);
      setFollowers((followers) =>
        incrementFollowers ? followers + 1 : followers - 1
      );
      setIsFollowing(incrementFollowers);
      console.log(dataDisco);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDisco();
  }, []);

  if (!disco) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img style={{ width: "100%" }} src={disco.image} alt="DiscoImg" />
      <h1>{disco.name}</h1>
      <h2>Disco</h2>
      <button type="submit" onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
      <div>
        <p>
          <span>{followers}</span> followers
        </p>
      </div>
      <div>
        <div>
          {disco.genre.map((genre, index) => (
            <div key={index}>{genre}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
