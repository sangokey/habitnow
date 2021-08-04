import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  resetSearch = (e) => {
    localStorage.removeItem("show");
  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">HabitNow</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/search" onClick={this.resetSearch}>
                Search Habits
              </Nav.Link>
            </Nav>
            <Navbar.Text>
              Signed in as: {localStorage.getItem("user")}
            </Navbar.Text>
            <Nav.Link href="/">Log Out</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default Header;
