import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import EventService from '../services/event.service';

import tokenPayload from '../services/token-payload';

export default function EventList() {
  const [suggestions, setSuggestions] = useState([]);
  const payload = tokenPayload();

  useEffect(() => {
    const fetchData = async () => {
      const result = await EventService.getSuggestions(payload.institution);
      console.log(result.data)
      setSuggestions(result.data.suggestions);
    };
    fetchData();
  }, []);

  return (
    <Container>
        {suggestions &&
          suggestions.map((suggestion) => {
            return (
              <Col
                key={`suggestion-${suggestion._id}`}
                xl={4}
                lg={5}
                md={7}
                sm={10}
                className="event mx-auto my-3"
              >
                <Card className="shadow">
                  <Card.Header>
                    <Card.Title>{suggestion.name}</Card.Title>
                  </Card.Header>
                </Card>
              </Col>
            );
          })}
    </Container>
  );
}
