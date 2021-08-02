import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    // <nav>
    //   <NavLink to="/" activeStyle={activeStyle}>
    //     Manage TODOs
    //   </NavLink>
    //   <NavLink to="/about" activeStyle={activeStyle}>
    //     About
    //   </NavLink>
    // </nav>
    <Navbar bg="light" variant="light">
      <Container className="justify-content-center">
        <Nav>
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            Manage ToDos
          </NavLink>
          <NavLink to="/about" className="nav-link" activeClassName="active">
            About
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
