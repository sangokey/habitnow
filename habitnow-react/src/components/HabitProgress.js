import React from "react";
import { Table } from "react-bootstrap";

class HabitProgress extends React.Component {
  constructor(props) {
    super(props);

    var today = new Date();
    today.setDate(today.getDate() - 5);

    var datelist = [];

    for (let i = 0; i < 7; i++) {
      today.setDate(today.getDate() + 1);
      var today_string = today.toISOString().split("T")[0];
      datelist.push(today_string);
    }

    var habits = JSON.parse(localStorage.getItem("habits"));
    var completelist = [];

    for (let i = 0; i < datelist.length; i++) {
      var current = datelist[i];
      for (let j = 0; j < habits.length; j++) {
        if (
          habits[j].title === this.props.title &&
          habits[j].date === current
        ) {
          if (habits[j].complete === true) {
            completelist.push("check");
          } else {
            completelist.push("nocheck");
          }
        }
      }
    }

    this.state = {
      datelist: datelist,
      completelist: completelist,
    };
  }

  render() {
    return (
      <Table bordered size="sm" style={{ marginLeft: 100, marginRight: 200 }}>
        <thead>
          <tr>
            {this.state.datelist.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {this.state.completelist.map((complete, index) => (
              <td
                key={index}
                id={complete}
                style={{
                  backgroundColor: complete === "check" ? "green" : "grey",
                  color: "transparent",
                }}
              >
                {complete}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default HabitProgress;
