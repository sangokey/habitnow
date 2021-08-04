import React from "react";
import Header from "../components/Header";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: localStorage.getItem("show") || false,
      search: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    localStorage.setItem("show", true);
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
            <a href="https://en.wikipedia.org/wiki/Reading">
              <h1>Reading</h1>
            </a>
            <p>
              Reading is the process of taking in the sense or meaning of
              letters, symbols, etc., especially by sight or touch. <br />
              For educators and researchers, reading is a multifaceted process
              involving such areas as word recognition, orthography (spelling),
              alphabetics, phonics, phonemic awareness, vocabulary,
              comprehension, fluency, and motivation. <br />
              Other types of reading and writing, such as pictograms (e.g., a
              hazard symbol and an emoji), are not based on speech-based writing
              systems. <br />
              The common link is the interpretation of symbols to extract the
              meaning from the visual notations or tactile signals (as in the
              case of Braille).
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
