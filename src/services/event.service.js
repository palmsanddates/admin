import api from '../utils/api';
import authHeader from './auth-header';

class EventService {
  getEvents() {
    return api.get('/events');
  }

  getEvent(eventId) {
    return api.get(`/events/${eventId}`);
  }

  createEvent(newEvent) {
    return api.post('/events', newEvent, { headers: authHeader() });
  }

  updateEvent(eventId, updatedEvent) {
    return api.patch(`/events/${eventId}`, updatedEvent, {
      headers: authHeader(),
    });
  }

  deleteEvent(eventId) {
    return api.delete(`/events/${eventId}`, { headers: authHeader() });
  }

  getSuggestions(institutionId) {
    return api.get(`/events/suggestions/${institutionId}`, {
      headers: authHeader(),
    });
  }
}

export default new EventService();
