import React, { useEffect, useState } from "react";
import discoService from "../../services/disco.service";
import { Link } from "react-router-dom";

export default function DiscoProfile({ disco, followers, isFollowing, id }) {
  const handleFollow = async () => {
    
    if (id) {
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
    }
  };
  console.log(disco)

  return (
    <div>
      <img style={{ width: "50%" }} src={disco.image} alt="DiscoImg" />
      <h1>{disco.name},</h1>
      <h2>Disco</h2>
      {id && (
        <button type="submit" onClick={handleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}

      <div>
        <p>
          <span>{disco.followers}</span> followers
        </p>
      </div>
      {!id ? <Link to="/events/create">Create event!</Link> : null}
    </div>
  );
}
