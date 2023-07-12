import React, { useEffect, useState } from "react";
import discoService from "../../services/disco.service";
import { useParams } from "react-router-dom";
import "chart.js";
import GenreMusicChart from "../GenreMusicChart";

export default function DiscoProfile({ disco, followers, isFollowing, id }) {
  const handleFollow = async () => {
    if (id) {
      try {
        const incrementFollowers = !isFollowing;
        const dataDisco = await discoService.updateDisco(id, incrementFollowers);
        setFollowers((followers) => (incrementFollowers ? followers + 1 : followers - 1));
        setIsFollowing(incrementFollowers);
        console.log(dataDisco);
      } catch (err) {
        console.log(err);
      }
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

      <GenreMusicChart genres={disco.genres} />
    </div>
  );
}
