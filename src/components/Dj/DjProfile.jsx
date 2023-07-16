import { useEffect, useState } from "react";
import djService from "../../services/dj.service";
import { Link } from "react-router-dom";
import eventService from "../../services/event.service";
import EventCardDj from "./EventCardDj";

export default function DjProfile({ djId, dj }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(dj?.followers || 0);
  const [djEvents, setDjEvents] = useState([]);


  const allEvents = async () => {
    try {
      const { data } = await eventService.getAllEvent();
      const djEventsData = data.filter((event) => event.dj._id === djId || dj?._id);
      setDjEvents(djEventsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    allEvents();
  }, []);

  const handleFollow = async () => {
    if (djId) {
      try {
        const incrementFollowers = !isFollowing;
        let handleFollowers = 0;
        if (incrementFollowers) {
          await djService.addFollower(djId);
          handleFollowers = showFollowers + 1;
        } else {
          await djService.removeFollower(djId);
          handleFollowers = showFollowers - 1;
        }
        setIsFollowing(incrementFollowers);
        setShowFollowers(handleFollowers);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    dj && (
      <div>
        <img style={{ width: "50%" }} src={dj.image} alt="DjImg" />
        <h1>{dj.username},</h1>
        <h2>DJ</h2>
        {djId && djId !== djId._id && (
          <button type="submit" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        <div>
          <p>
            <span>{showFollowers}</span> followers
          </p>
        </div>
        <div>
          <p>
            <span>{djEvents.length}</span> event(s)
          </p>
        </div>
        <div>
          {djEvents.map((event) => (
            <div key={event._id}>
              <EventCardDj {...event} />
            </div>
          ))}
        </div>
        <br />
      </div>
    )
  );
}
