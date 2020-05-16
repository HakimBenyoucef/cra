import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import "../style/styles.css";

class Day extends Component {
  state = {
    className: "white",
  };
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log("white");
    if (this.state.className === "white") {
      this.setState({
        className: "blue",
      });
    } else {
      this.setState({
        className: "white",
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.props.day && (
          <button
            onClick={this.onClick}
            className={"day " + this.state.className}
          >
            {this.props.day}
          </button>
        )}
      </React.Fragment>
    );
  }
}

export default Day;
