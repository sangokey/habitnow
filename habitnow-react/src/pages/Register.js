import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", firstname: "", lastname: "" };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(this.state),
    };

    fetch("http://localhost:8080/users", options);

    this.setState({ username: "", password: "", firstname: "", lastname: "" });

    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        Create an Account
        <form onSubmit={this.onSubmit}>
          <label>
            First Name:
            <input type="text" name="firstname" onChange={this.onChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastname" onChange={this.onChange} />
          </label>
          <br />
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
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default Register;
