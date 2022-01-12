import { Button, Navbar, Container } from 'react-bootstrap';
import logo from '../Logo.png';
import Auth from '../services/auth.service';
import { useAppContext } from '../lib/contextLib';

function LightNavbar() {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  async function handleLogout() {
    await Auth.logout();

    userHasAuthenticated(false);
  }

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
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
            <Button variant="outline-primary" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LightNavbar;
