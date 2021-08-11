import React from "react";
import HabitProgress from "./HabitProgress";

class Habit extends React.Component {
  constructor(props) {
    super(props);
  }

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
        <input
          name="complete"
          type="checkbox"
          checked={this.props.complete ? "checked" : ""}
          style={{ marginLeft: 200, marginRight: 50 }}
          onChange={() => {
            const habits = JSON.parse(localStorage.getItem("habits"));

            for (let i = 0; i < habits.length; i++) {
              if (
                habits[i].title === this.props.title &&
                habits[i].date === localStorage.getItem("currentDate")
              ) {
                habits[i].complete = !habits[i].complete;
              }
            }

            localStorage.setItem("habits", JSON.stringify(habits));

            localStorage.setItem("currentDate", this.props.date);
            window.location.reload(false);
          }}
        />
        <h1>{this.props.title}</h1>
        {localStorage.getItem("habits") && (
          <HabitProgress
            title={this.props.title}
            date={this.props.date}
          ></HabitProgress>
        )}
      </div>
    );
  }
}

export default Habit;
