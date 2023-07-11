import React from "react";
import EventProfile from "../../../components/Event/EventProfile";
import eventService from "../../../services/event.service";

import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

function EventProfilePage() {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const res = await eventService.getAllEvent();
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const renderEvents = () => {
    return events.map((event) => {
      <div key={event._id}>
        <EventProfile {...event} />
      </div>;
    });
  };

  return <Container>{renderEvents()}</Container>;
}

export default EventProfilePage;
