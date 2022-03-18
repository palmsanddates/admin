import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../Logo.png';
import Auth from '../services/auth.service';
import { useAppContext } from '../lib/contextLib';
import { useNavigate } from 'react-router-dom';

function LightNavbar() {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  let navigate = useNavigate();

  async function handleLogout() {
    await Auth.logout();

    userHasAuthenticated(false);
  }

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container>
        <Navbar.Brand
          onClick={() => navigate('/events')}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={logo}
            width="120"
            height="60"
            className="d-inline-block align-top"
            alt="logo"
            href="/"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {isAuthenticated && (
            <Nav>
              <Nav.Link>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate('/events/suggestions')}
                >
                  Suggestions
                </Button>
              </Nav.Link>
              <Nav.Link>
                <Button variant="outline-primary" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LightNavbar;
