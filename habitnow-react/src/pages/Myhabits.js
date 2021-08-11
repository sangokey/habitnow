import React from "react";
import Header from "../components/Header";
import HabitManage from "../components/HabitManage";
import { Form, Modal, Button } from "react-bootstrap";

class Myhabits extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habitnames: JSON.parse(localStorage.getItem("habitnames")) || [],
      habits: JSON.parse(localStorage.getItem("habits")) || [],
      show: false,
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  createHabit = () => {
    var now = new Date();
    now.setDate(now.getDate() - 32);
    var habit_temp = [];

    for (let i = 0; i < 60; i++) {
      var newdate = new Date(now.setDate(now.getDate() + 1));
      newdate = newdate.toISOString().split("T")[0];
      habit_temp.push({
        date: newdate,
        title: this.state.habit,
        complete: false,
      });
    }

    this.setState(
      {
        habitnames: [...this.state.habitnames, this.state.habit],
        show: false,
        habit: "",
        habits: [...this.state.habits, ...habit_temp],
      },
      () => {
        localStorage.setItem(
          "habitnames",
          JSON.stringify(this.state.habitnames)
        );
        localStorage.setItem("habits", JSON.stringify(this.state.habits));
      }
    );
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Header activeUser={this.props.location.state} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <h1 style={{ marginRight: 50 }}>{this.state.currentDate}</h1>
          <Button onClick={this.handleShow}>Create Habit</Button>
        </div>

        <div>
          {this.state.habitnames.length !== 0 ? (
            <div id="habitlist">
              {this.state.habitnames.map((habit, index) => {
                return (
                  <HabitManage
                    key={index}
                    title={habit}
                    index={index}
                  ></HabitManage>
                );
              })}
            </div>
          ) : (
            <div>No habits, create a new habit today</div>
          )}
        </div>

        {this.state.show && (
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Habit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Habit Name: </Form.Label>
                <Form.Control
                  type="text"
                  name="habit"
                  onChange={this.onChange}
                  value={this.state.habit}
                  placeholder="Read for 10 minutes"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.createHabit}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

export default Myhabits;
