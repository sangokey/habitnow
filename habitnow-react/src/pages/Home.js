import React from "react";
import Header from "../components/Header";
import Habit from "../components/Habit";
import { Form, Modal, Button } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

class Home extends React.Component {
  constructor(props) {
    super(props);

    var today = new Date();
    today.setDate(today.getDate() - 1);
    var today_string = today.toISOString().split("T")[0];
    localStorage.setItem("currentDate", today_string);

    this.state = {
      todayDate: today,
      currentDate: today,
      currentDateString: today_string,
      habits: JSON.parse(localStorage.getItem("habits")) || [],
      habitnames: JSON.parse(localStorage.getItem("habitnames")) || [],
      habit: "",
      show: false,
    };
  }

  goBackDate = () => {
    var newDate = new Date(
      this.state.currentDate.setDate(this.state.currentDate.getDate() - 1)
    );

    this.setState({
      currentDate: newDate,
      currentDateString: newDate.toISOString().split("T")[0],
    });

    localStorage.setItem("currentDate", newDate.toISOString().split("T")[0]);
  };

  goFowardDate = () => {
    var newDate = new Date(
      this.state.currentDate.setDate(this.state.currentDate.getDate() + 1)
    );

    this.setState({
      currentDate: newDate,
      currentDateString: newDate.toISOString().split("T")[0],
    });

    localStorage.setItem("currentDate", newDate.toISOString().split("T")[0]);
  };

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
    window.location.reload(false);
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
          <ArrowLeft color="grey" size={30} onClick={this.goBackDate} />
          <h1>{this.state.currentDateString}</h1>
          <ArrowRight
            color="grey"
            size={30}
            style={{ marginRight: 50 }}
            onClick={this.goFowardDate}
          />
          <Button onClick={this.handleShow}>Create Habit</Button>
        </div>

        <div>
          {this.state.habits.length !== 0 ? (
            <div id="habitlist">
              {this.state.habits.map((habit, index) => {
                if (habit.date === this.state.currentDateString) {
                  return (
                    <Habit
                      key={index}
                      date={this.state.currentDate}
                      title={habit.title}
                      complete={habit.complete}
                    ></Habit>
                  );
                }
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

export default Home;
