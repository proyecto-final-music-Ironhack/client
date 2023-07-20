import { useEffect, useState } from "react";
import djService from "../../services/dj.service";
import { Link } from "react-router-dom";
import eventService from "../../services/event.service";
import EventCardDj from "./EventCardDj";
import { Container } from "@chakra-ui/react";

export default function DjProfile({ djId, dj }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(0);
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
    setShowFollowers(dj?.followers);
    allEvents();
  }, [dj]);

  const handleFollow = async () => {
    if (djId) {
      try {
        const incrementFollowers = !isFollowing;
        if (incrementFollowers) {
          await djService.addFollower(djId);
          setShowFollowers((num) => num + 1);
        } else {
          await djService.removeFollower(djId);
          setShowFollowers((num) => num - 1);
        }
        setIsFollowing(incrementFollowers);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    dj && (
      <Container className="bg-black" >
        <img style={{ width: "50%" }} src={dj.image} alt="DjImg" />
        <h1>{dj.username},</h1>
        <h2>DJ</h2>
        {djId && djId !== djId._id && (
          <button type="submit" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        <div>
          {dj.followers && (
            <p>
              <span>{showFollowers}</span> followers
            </p>
          )}
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
      </Container>
    )
  );
}
