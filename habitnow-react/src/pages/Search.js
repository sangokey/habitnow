import React from "react";
import Header from "../components/Header";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: localStorage.getItem("show") || false,
      search: "",
      searchterm: "",
      url: "",
      summary: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    fetch(
      "https://serene-inlet-08860.herokuapp.com/api/v1/" + this.state.search
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          url: data.fullurl,
          summary: data.summary,
          searchterm: this.state.search,
          show: true,
        })
      );
  };

  render() {
    return (
      <div>
        <Header />
        <h1>Search for Habits</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Search anything:
            <input type="text" name="search" onChange={this.onChange} />
          </label>
          <input type="submit" value="Search" />
        </form>
        <br />
        {this.state.show && (
          <div style={{ marginLeft: 50 }}>
            <a href={this.state.url}>
              <h1>{this.state.searchterm}</h1>
            </a>
            <p>{this.state.summary}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
