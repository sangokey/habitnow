import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  resetSearch = (e) => {
    localStorage.removeItem("show");
  };

  renderHome = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Complete Today's Tasks and See Your Progress!
    </Tooltip>
  );

  renderHabits = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Easily Create, Edit, and Delete Existing Habits!
    </Tooltip>
  );

  searchHabits = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Learn about potential habits!
    </Tooltip>
  );

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">HabitNow</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderHome}
              >
                <Nav.Link href="/home">Home</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderHabits}
              >
                <Nav.Link href="/myhabits">My Habits</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={this.searchHabits}
              >
                <Nav.Link href="/search" onClick={this.resetSearch}>
                  Search Habits
                </Nav.Link>
              </OverlayTrigger>
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
