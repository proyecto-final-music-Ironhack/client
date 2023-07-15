import { useEffect, useState } from "react";
import djService from "../../services/dj.service";
import { Link } from "react-router-dom";
import eventService from "../../services/event.service";
import EventCardDj from "./EventCardDj";

export default function DjProfile({ djId, dj }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [djEvents, setDjEvents] = useState([]);

  const allEvents = async () => {
    try {
      const { data } = await eventService.getAllEvent();
      const djEventsData = data.filter(
        (event) => event.dj._id === djId || dj?._id
      );
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
        if (incrementFollowers) {
          await djService.addFollower(djId);
        } else {
          await djService.removeFollower(djId);
        }
        setIsFollowing(incrementFollowers);
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
            <span>{dj.followers}</span> followers
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
