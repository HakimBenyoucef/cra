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
    if (this.state.className === "white") {
      this.setState({
        className: "blue",
      });
      this.props.updateCra(this.props.day, 1);
    } else {
      this.setState({
        className: "white",
      });
      this.props.updateCra(this.props.day, 0);
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
