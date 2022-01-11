import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form } from 'react-bootstrap';

import Auth from '../services/auth.service';
import LoaderButton from '../components/LoaderButton';
import { useAppContext } from '../lib/contextLib';
import { onError } from '../lib/errorLib';
// import './Login.css';

function Login() {
  const { userHasAuthenticated } = useAppContext();
  let navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.login(email, password);
      userHasAuthenticated(true);
      navigate('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function handleKeyPress(e) {
    if (e.keyCode === 13) this.handleLogin(e);
  }

  return (
    <Container>
      <Card
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        className="w-50 mt-5 p-5 shadow"
      >
        <Card.Body>
          <Card.Title>Admin Login</Card.Title>
          <hr />
          <Form onKeyDown={handleKeyPress} onSubmit={handleLogin}>
            <Form.Group size="lg" controlId="formLoginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                placeholder="example@dominican.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                This must be a .edu email address
              </Form.Text>
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="formLoginPassword"
              className="mb-3"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <LoaderButton
              size="lg"
              type="submit"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Login
            </LoaderButton>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
