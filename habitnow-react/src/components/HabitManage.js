import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

class HabitManage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habits: JSON.parse(localStorage.getItem("habits")) || [],
      showedit: false,
      showdelete: false,
      newname: this.props.title,
    };
  }

  handleEditShow = () => {
    this.setState({ showedit: true });
  };

  handleDeleteShow = () => {
    this.setState({ showdelete: true });
  };

  handleClose = () => {
    this.setState({ showdelete: false, showedit: false });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editHabit = () => {
    var habitstemp = JSON.parse(localStorage.getItem("habits"));
    habitstemp.map((habit) => {
      if (habit.title === this.props.title) {
        habit.title = this.state.newname;
      }
    });

    this.setState(
      {
        showedit: false,
        habits: habitstemp,
        newname: "",
      },
      () => {
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
      }
    );

    window.location.reload(false);
  };

  deleteHabit = () => {
    var habitstemp = JSON.parse(localStorage.getItem("habits"));
    habitstemp.splice(this.props.index, 1);

    this.setState(
      {
        showdelete: false,
        habits: habitstemp,
        newname: "",
      },
      () => {
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
      }
    );

    window.location.reload(false);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <h1>{this.props.index + 1}.&nbsp;</h1>
        <h1>{this.props.title}</h1>
        <Button
          variant="secondary"
          style={{
            marginLeft: 20,
          }}
          onClick={this.handleEditShow}
        >
          Edit
        </Button>
        <Modal show={this.state.showedit} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Habit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Habit Name: </Form.Label>
              <Form.Control
                type="text"
                name="newname"
                onChange={this.onChange}
                value={this.state.newname}
                placeholder={this.props.title}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.editHabit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="danger" onClick={this.handleDeleteShow}>
          Delete
        </Button>
        <Modal show={this.state.showdelete} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Habit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Habit Name: </Form.Label>
              <br />
              <Form.Label>{this.props.title}</Form.Label>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={this.deleteHabit}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HabitManage;
