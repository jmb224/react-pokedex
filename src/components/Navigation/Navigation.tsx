import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export function Navigation() {
  const navigate = useNavigate();

  function handleOnLinkClick(event: React.MouseEvent) {
    event.preventDefault();

    const href = (event.target as HTMLLinkElement).getAttribute('href');

    if (!href) return;

    navigate(href);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/" onClick={handleOnLinkClick}>
        Pokémon Tracker
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="mypokedex" onClick={handleOnLinkClick}>
            My Pokedex
          </Nav.Link>
          <Nav.Link href="analytics">Analytics</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
