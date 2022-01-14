import api from '../utils/api';
import authHeader from './auth-header';

class ClubService {
  getClubs() {
    return api.get('/clubs');
  }

  getClub(clubId) {
    return api.get(`/clubs/${clubId}`);
  }

  createClub(newClub) {
    return api.post('/clubs', newClub, { headers: authHeader() });
  }

  deleteClub(clubId) {
    return api.delete(`/clubs/${clubId}`, { headers: authHeader() });
  }
}

export default new ClubService();
