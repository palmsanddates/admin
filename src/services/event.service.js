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

  deleteEvent(eventId) {
    return api.delete(`/events/${eventId}`, { headers: authHeader() });
  }
}

export default new EventService();
