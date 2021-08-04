import React from "react";
import { Link } from "react-router-dom";

class Front extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", valid: false };
    localStorage.clear();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    fetch(
      "http://localhost:8080/authenticate/" +
        this.state.username +
        "/" +
        this.state.password
    ).then(async (response) => {
      const data = await response;

      if (data.status === 200) {
        localStorage.setItem("user", this.state.username);
        this.props.history.push("/home", { user: this.state.username });
      } else {
        this.setState({ valid: true });
      }
    });
  };

  render() {
    return (
      <div>
        <h1>HabitNow</h1>
        <h4>Start Your Habit Now!</h4>

        {this.state.valid === true && (
          <div style={{ color: "red" }}>
            Username and Password combination not found! Try again.
          </div>
        )}

        <form onSubmit={this.onSubmit}>
          <label>
            Username:
            <input type="text" name="username" onChange={this.onChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" onChange={this.onChange} />
          </label>
          <br />
          <input type="submit" value="Log In" />
        </form>

        <Link to="/register" className="btn btn-primary">
          Sign up
        </Link>
      </div>
    );
  }
}

export default Front;
