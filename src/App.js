import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import "moment/locale/fr";
import GridContainer from "./Components/GridContainer";
import FormCalendar from "./Components/FormCalendar";
import Calendar from "./Components/Calendar";
import Excel from "./Components/Excel";
import { Input } from "semantic-ui-react";

class App extends Component {
  cra = [];

  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      previousYear: new Date().getFullYear() - 1,
      month: new Date().getMonth(),
      name: "",
    };
    moment.locale();
    this._months = moment.months();

    this.onYearChange = this.onYearChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setExporter = this.setExporter.bind(this);
    this.setDays = this.setDays.bind(this);
    this.fillCra = this.fillCra.bind(this);
    this.updateCra = this.updateCra.bind(this);
    this.setName = this.setName.bind(this);
  }

  onYearChange(e, { value }) {
    this.setState({
      year: value,
    });
    this.cra = [];
  }

  onMonthChange(e, { value }) {
    this.setState({
      month: this._months.indexOf(value),
    });
    this.cra = [];
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
      if (row.type === "data" && index <= this._days.length) {
        if (
          this._days[index - 1].jour === "Samedi" ||
          this._days[index - 1].jour === "Dimanche"
        ) {
          row.cells.forEach((cell) => {
            cell.background = "#C2C2C2";
          });
        }
      }
    });

    component.save(options);
  };

  fillCra(days) {
    days.forEach((day) => this.cra.push({ jour: day.numero, presence: 0 }));
  }

  updateCra(day, presence) {
    this.cra.map((jour) => {
      if (jour.jour === day) {
        jour.presence = presence;
      }
      return jour;
    });
  }

  setName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    return (
      <GridContainer>
        <Input
          placeholder="Votre prénom"
          fluid
          value={this.state.name}
          onChange={this.setName}
        />
        <Calendar
          month={this.state.month}
          year={this.state.year}
          setDays={this.setDays}
          fillCra={this.fillCra}
          updateCra={this.updateCra}
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
          cra={this.cra}
          name={this.state.name}
        />
      </GridContainer>
    );
  }
}

export default App;
