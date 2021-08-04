import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state);
  }

  logIn(username) {
    this.setState({ user: username });
  }

  render() {
    return <div>Create</div>;
  }
}

export default Search;
