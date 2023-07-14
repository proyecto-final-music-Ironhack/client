import React, { useEffect, useState } from "react";
import discoService from "../../services/disco.service";
import { Link } from "react-router-dom";
import NextEventCard from "../Event/NextEventCard";

export default function DiscoProfile({ disco, discoId }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (discoId) {
      try {
        const incrementFollowers = !isFollowing;
        if (incrementFollowers) {
          await discoService.addFollower(discoId);
        } else {
          await discoService.removeFollower(discoId);
        }
        setIsFollowing(incrementFollowers);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getDiscoEvents = () => {
    return disco.events.map((event) => {
      return (
        <div key={event._id}>
          <NextEventCard {...event} />
        </div>
      );
    });
  };

  return (
    disco && (
      <div>
        <img style={{ width: "50%" }} src={disco.image} alt="DiscoImg" />
        <h1>{disco.name},</h1>
        <h2>Disco</h2>
        {discoId && discoId !== discoId._id && (
          <button type="submit" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        <div>
          <p>
            <span>{disco.followers}</span> followers
          </p>
        </div>
        {!discoId && <Link to="/events/create">Create event!</Link>}
        <br />
        <h2>Next Events</h2>
        {getDiscoEvents()}
      </div>
    )
  );
}
