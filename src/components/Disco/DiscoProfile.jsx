import React, { useEffect, useState } from "react";
import discoService from "../../services/disco.service";
import { Link } from "react-router-dom";

export default function DiscoProfile({ disco, id }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (id) {
      try {
        const incrementFollowers = !isFollowing;
        if (incrementFollowers) {
          await discoService.addFollower(id);
        } else {
          await discoService.removeFollower(id);
        }
        setIsFollowing(incrementFollowers);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    disco && (
      <div>
        <img style={{ width: "50%" }} src={disco.image} alt="DiscoImg" />
        <h1>{disco.name},</h1>
        <h2>Disco</h2>
        {id && id !== disco._id && (
          <button type="submit" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        <div>
          <p>
            <span>{disco.followers}</span> followers
          </p>
        </div>
        {!id && <Link to="/events/create">Create event!</Link>}
        <br />
        <Link to="/disco/649dd6f77c0d5811d70d3647">jaja!</Link>
      </div>
    )
  );
}
