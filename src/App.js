import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import GridContainer from "./Components/GridContainer";
import FormCalendar from "./Components/FormCalendar";
import Calendar from "./Components/Calendar";
import Excel from "./Components/Excel";

class App extends Component {
  _exporter;

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
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setExporter = this.setExporter.bind(this);
    this.setDays = this.setDays.bind(this);
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

  exportToExcel() {
    this.save(this._exporter);
  }

  setExporter(exporter) {
    this._exporter = exporter;
  }

  setDays(days) {
    this._days = days;
  }

  save = (component) => {
    const options = component.workbookOptions();
    const rows = options.sheets[0].rows;

    rows.forEach((row, index) => {
      if (row.type === "data") {
        console.log("i = ", index);

        console.log("this._days.jour = ", this._days[index-1].jour);
        if (this._days[index-1].jour === "Samedi" || this._days[index-1].jour === "Dimanche") {
          row.cells.forEach((cell) => {
            
            cell.background = "#C2C2C2";
          });
        }
      }
    });

    component.save(options);
  };

  render() {
    return (
      <GridContainer>
        <Calendar
          month={this.state.month}
          year={this.state.year}
          setDays={this.setDays}
        />
        <FormCalendar
          month={this.state.month}
          year={this.state.year}
          months={this._months}
          onYearChange={this.onYearChange}
          onMonthChange={this.onMonthChange}
          exportToExcel={this.exportToExcel}
        />
        <Excel
          setExporter={this.setExporter}
          month={this._months[this.state.month]}
        />
      </GridContainer>
    );
  }
}

export default App;
