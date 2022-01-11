import jwt_decode from 'jwt-decode';
import Auth from './auth.service';

export default function tokenPayload() {
  const user = Auth.getCurrentUser();

  if (user && user.token) {
    return jwt_decode(user.token);
  } else {
    return {};
  }
}
