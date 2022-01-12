import React, { useEffect, useState } from 'react';
import { Container, Col, Card, NavLink, Button } from 'react-bootstrap';

import EventService from '../services/event.service';
import './EventList.css';

export default function EventList() {
  const [events, setEvents] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await EventService.getEvents();
      setEvents(result.data);
    };
    fetchData();
  }, []);

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
                <NavLink className="p-0" to={`/events/${event._id}`}>
                  <Card.Header className="text-dark ">{event.name}</Card.Header>
                  <Card.Body>
                    <Card.Img
                      src={event.flyer_img_url}
                      className="event-card-img"
                    />
                    <span className="img-time">
                      {' '}
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
                </NavLink>
                <Card.Footer>
                  <Button
                    className="w-100 event-card-button"
                  >Edit</Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
    </Container>
  );
}
