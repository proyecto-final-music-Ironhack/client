import React, { useEffect, useState } from "react";
import discoService from "../../services/disco.service";
import { Link } from "react-router-dom";
import EventCardDisco from "./EventCardDisco";

export default function DiscoProfile({ disco, discoId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(0);

  useEffect(() => {
    setShowFollowers(disco?.followers)
  }, [disco])

  const handleFollow = async () => {
    if (discoId) {
      try {
        const incrementFollowers = !isFollowing;
        if (incrementFollowers) {
          await discoService.addFollower(discoId);
          setShowFollowers((num) => num + 1);
        } else {
          await discoService.removeFollower(discoId);
          setShowFollowers((num) => num - 1);
        }
        setIsFollowing(incrementFollowers);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getDiscoEvents = () => {
    return disco.events.map((event) => {
      return (
        <div key={event._id}>
          <EventCardDisco {...event} />
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
          {disco.followers && (
            <p>
              <span>{showFollowers}</span> followers
            </p>
          )}
        </div>
        <div>
          <p>{disco.events.length} event(s)</p>
        </div>
        {!discoId && <Link to="/events/create">Create event!</Link>}
        <br />
        <h2>Next Events</h2>
        {disco.events ? getDiscoEvents() : <p>Not events yet</p>}
        {}
      </div>
    )
  );
}
