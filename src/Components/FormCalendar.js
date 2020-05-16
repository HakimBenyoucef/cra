import React, { Component } from "react";
import { Form } from "semantic-ui-react";

const year = new Date().getFullYear();
const previousYear = new Date().getFullYear() - 1;

class FormCalendar extends Component {
  render() {
    return (
      <Form onSubmit={this.props.exportToExcel}>
        <Form.Dropdown
          fluid
          selection
          scrolling
          value={this.props.year}
          required
          onChange={this.props.onYearChange}
          options={[
            {
              key: year,
              text: year,
              value: year,
            },
            {
              key: previousYear,
              text: previousYear,
              value: previousYear,
            },
          ]}
        />
        <Form.Dropdown
          fluid
          selection
          scrolling
          value={this.props.months[this.props.month]}
          required
          onChange={this.props.onMonthChange}
          options={this.props.months.map((month) => ({
            key: month,
            text: month,
            value: month,
          }))}
        />
        <Form.Button content="Export to Excel" primary fluid />
      </Form>
    );
  }
}

export default FormCalendar;
