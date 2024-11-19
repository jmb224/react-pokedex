import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavLink
} from 'react-bootstrap';
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
      <NavbarBrand href="/" onClick={handleOnLinkClick}>
        Pokémon Tracker
      </NavbarBrand>
      <NavbarToggle aria-controls="basic-navbar-nav" />
      <NavbarCollapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink href="mypokedex" onClick={handleOnLinkClick}>
            My Pokedex
          </NavLink>
          <NavLink href="analytics">Analytics</NavLink>
          <NavLink href="settings">Settings</NavLink>
        </Nav>
        <Form>
          <FormControl type="text" placeholder="Search Pokémon" className="mr-sm-2" />
        </Form>
      </NavbarCollapse>
    </Navbar>
  );
}
