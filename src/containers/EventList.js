import React, { useEffect, useState } from 'react';
import { Container, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, createSearchParams } from 'react-router-dom';

import EventService from '../services/event.service';
import './EventList.css';

import tokenPayload from '../services/token-payload';

export default function EventList() {
  const [events, setEvents] = useState();
  const payload = tokenPayload();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await EventService.getEvents();
      setEvents(result.data.filter((event) => event.creator === payload._id));
    };
    fetchData();
  }, []);

  function onCardClick(eventId) {
    navigate(`/events/${eventId}`);
  }

  const onEditClick = (eventId) =>
    navigate({
      pathname: `/events/${eventId}`,
      search: `?${createSearchParams({ edit: true })}`,
    });

  return (
    <Container>
      {events &&
        events.map((event) => {
          return (
            <Col
              key={`event-${event._id}`}
              xl={4}
              lg={5}
              md={7}
              sm={10}
              className="event mx-auto my-5"
            >
              <Card className="border-0 event-card shadow text-center">
                <Card.Header className="text-dark ">{event.name}</Card.Header>
                <Card.Body
                  onClick={() => onCardClick(event._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Img
                    src={event.flyer_img_url}
                    className="event-card-img"
                  />
                  <span className="img-time">
                    {new Date(event.end_time).toLocaleString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                </Card.Body>
                <Card.Footer>
                  <Button
                    className="w-100 event-card-button"
                    onClick={() => onEditClick(event._id)}
                  >
                    Edit
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
    </Container>
  );
}
