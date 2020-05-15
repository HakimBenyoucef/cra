import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class Day extends Component {
  render() {
    return (
      <React.Fragment>
        <Card link fluid color='red' header={this.props.day} />
      </React.Fragment>
    );
  }
}

export default Day;
