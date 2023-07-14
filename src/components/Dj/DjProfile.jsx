import { useEffect, useState } from "react";
import djService from "../../services/dj.service";
import { Link } from "react-router-dom";

export default function DjProfile({ dj, id }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (id) {
      try {
        const incrementFollowers = !isFollowing;
        if (incrementFollowers) {
          await djService.addFollower(id);
        } else {
          await djService.removeFollower(id);
        }
        setIsFollowing(incrementFollowers);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    dj && (
      <div>
        <img style={{ width: "50%" }} src={dj.image} alt="DjImg" />
        <h1>{dj.name},</h1>
        <h2>DJ</h2>
        {id && id !== dj._id && (
          <button type="submit" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        <div>
          <p>
            <span>{dj.followers}</span> followers
          </p>
        </div>
        <br />
        <Link to="/dj/64adce45be4c652eb8cf3999">jaja!</Link>
      </div>
    )
  );
}
