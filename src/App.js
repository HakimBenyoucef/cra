import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import GridContainer from "./Components/GridContainer";
import FormCalendar from "./Components/FormCalendar";
import Calendar from "./Components/Calendar";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      previousYear: new Date().getFullYear() - 1,
      month: new Date().getMonth(),
    };

    this._months = moment.months();

    this.onYearChange = this.onYearChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
  }

  onYearChange(e, { value }) {
    this.setState({
      year: value,
    });
  }

  onMonthChange(e, { value }) {
    this.setState({
      month: this._months.indexOf(value),
    });
  }

  render() {
    return (
      <GridContainer>
        
        <Calendar month={this.state.month} year={this.state.year}/>

        <FormCalendar
          month={this.state.month}
          year={this.state.year}
          months={this._months}
          onYearChange={this.onYearChange}
          onMonthChange={this.onMonthChange}
        />
      </GridContainer>
    );
  }
}

export default App;
