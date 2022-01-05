import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

import AuthService from '../services/auth.service';
import LoaderButton from '../components/LoaderButton';

function Login(props) {
  // const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await AuthService.login(email, password);
      props.setIsAuth(true);
      setIsLoading(false);
      // navigate('/');
    } catch (error) {
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
        className="w-50 mt-5"
      >
        <Card.Body>
          <Card.Title>Admin Login</Card.Title>
          <Form onKeyDown={handleKeyPress} onSubmit={handleLogin}>
            <Form.Group size="lg" controlId="formLoginEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@dominican.edu"
                value={email}
              ></Form.Control>
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
              <Form.Control type="password" value={password} />
            </Form.Group>

            <LoaderButton block size="lg" type="submit" isLoading={isLoading}>
              Login
            </LoaderButton>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
