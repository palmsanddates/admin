import { Navbar, Container } from 'react-bootstrap';
import logo from '../Logo.png';
import Auth from '../services/auth.service';

function LightNavbar(props) {
  async function handleLogout() {
    await Auth.logout();

    props.userHasAuthenticated(false);
  }

  return (
    <Navbar bg="light" className="shadow">
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
      </Container>
    </Navbar>
  );
}

export default LightNavbar;
