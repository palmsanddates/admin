import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
} from 'react-bootstrap';
import {
  FiArrowLeft,
  FiEdit,
  FiDelete,
  FiSave,
  FiXSquare,
} from 'react-icons/fi';
import Multiselect from 'multiselect-react-dropdown';

import EventService from '../services/event.service';
import ClubService from '../services/club.service';
import './EventDetail.css';

function EventDetail() {
  let navigate = useNavigate();
  const { eventId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [clubs, setClubs] = useState([]);
  const [event, setEvent] = useState({
    name: '',
    description: '',
    creator: '',
    start_time: '',
    end_time: '',
    flyer_img_url: '',
    rsvp_url: '',
    clubs: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const eventRes = await EventService.getEvent(eventId);
      setEvent(eventRes.data);

      const clubsRes = await ClubService.getClubs();
      setClubs(clubsRes.data.clubs.map((x) => ({ _id: x._id, name: x.name })));
    };
    fetchData();
    searchParams.get('edit') && setIsEditing(true);
    setIsLoading(false);
  }, []);

  function handleEventParam(e) {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  }

  function handleEdit() {
    setIsEditing(true);
    setSearchParams({ edit: true });
  }

  async function handleDelete() {
    await EventService.deleteEvent(eventId);
    navigate('/');
  }

  async function handleSave() {
    await EventService.updateEvent(eventId, event);
    setIsEditing(false);
    setSearchParams({ edit: false });
  }

  function handleCancel() {
    setIsEditing(false);
    setSearchParams({ edit: false });
  }

  let cardHeader = (
    <div>
      <Button className="mx-2" variant="danger" onClick={handleDelete}>
        <FiDelete />
        Delete
      </Button>
      <Button onClick={handleEdit}>
        <FiEdit className="pr-2" />
        Edit
      </Button>
    </div>
  );

  if (isEditing) {
    cardHeader = (
      <div>
        <Button className="mx-2" variant="danger" onClick={handleCancel}>
          <FiXSquare />
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <FiSave className="pr-2" />
          Save
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <Card className="p-3 mt-4 shadow-sm h-100 overflow-auto">
        <Card.Header
          className="px-0 py-2 d-flex justify-content-between"
          style={{ backgroundColor: '#fff' }}
        >
          <Button onClick={() => navigate('/events')}>
            <FiArrowLeft />
          </Button>
          {cardHeader}
        </Card.Header>
        <Card.Body className="pt-3">
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Img
                    src={event.flyer_img_url}
                    style={{ maxHeight: '65vh', objectFit: 'contain' }}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Form>
                <Form.Group controlId="formEventName" className="mb-2">
                  <FloatingLabel label="Name">
                    <Form.Control
                      name="name"
                      type="text"
                      value={event.name}
                      placeholder="Event name..."
                      onChange={handleEventParam}
                      readOnly={!isEditing}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="formEventDescription" className="mb-2">
                  <FloatingLabel label="Description">
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={event.description}
                      placeholder="Event description..."
                      style={{ height: '150px' }}
                      onChange={handleEventParam}
                      readOnly={!isEditing}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="formEventLocation" className="mb-2">
                  <FloatingLabel label="Location">
                    <Form.Control
                      type="text"
                      name="location"
                      value={event.location}
                      placeholder="Event location..."
                      onChange={handleEventParam}
                      readOnly={!isEditing}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="formEventStartTime" className="mb-2">
                  <FloatingLabel label="Start Time">
                    <Form.Control
                      name="start_time"
                      type="datetime-local"
                      value={event.start_time.toString().substring(0, 16)}
                      placeholder="Event start time..."
                      onChange={handleEventParam}
                      readOnly={!isEditing}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="formEventEndTime" className="mb-2">
                  <FloatingLabel label="End Time">
                    <Form.Control
                      name="end_time"
                      type="datetime-local"
                      value={event.end_time.toString().substring(0, 16)}
                      placeholder="Event end time..."
                      onChange={handleEventParam}
                      readOnly={!isEditing}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formEventRsvpUrl" className="mb-2">
                  <FloatingLabel label="RSVP Url">
                    <Form.Control
                      name="rsvp_url"
                      type="text"
                      value={event.rsvp_url}
                      placeholder="https://www.google.com/"
                      onChange={handleEventParam}
                      readOnly={!isEditing}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formEventClubs" className="mb-2">
                  <Multiselect
                    name="clubs"
                    options={clubs}
                    selectedValues={event.clubs}
                    onSelect={(selected) =>
                      setEvent({ ...event, clubs: selected })
                    }
                    onRemove={(removed) =>
                      setEvent({ ...event, clubs: removed })
                    }
                    displayValue="name"
                    placeholder="Select clubs..."
                    selectionLimit={3}
                    closeOnSelect={true}
                    disable={!isEditing}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EventDetail;
