import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import "moment/locale/fr";
import GridContainer from "./Components/GridContainer";
import FormCalendar from "./Components/FormCalendar";
import Calendar from "./Components/Calendar";
import Excel from "./Components/Excel";
import { Input, Checkbox, Header, Segment, Grid } from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      previousYear: new Date().getFullYear() - 1,
      month: new Date().getMonth(),
      name: "",
      cra: [],
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
    this.selectAll = this.selectAll.bind(this);
  }

  onYearChange(e, { value }) {
    console.log(value)
    this.setState({
      year: value,
    });
  }

  onMonthChange(e, { value }) {
    console.log(value)
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
    let cra = this.state.cra;
    days.forEach((day) =>
      cra.push({ numero: day.numero, jour: day.jour, presence: 0 })
    );
    this.setState({
      cra: cra,
    });
  }

  updateCra(day, presence) {
    let cra = this.state.cra;
    cra.map((jour) => {
      if (jour.numero === day) {
        jour.presence = presence;
      }
      return jour;
    });
    this.setState({
      cra: cra,
    });
  }

  setName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  selectAll(e, data) {
    let cra = this.state.cra;
    let presence = data.checked ? 1 : 0;
    cra.map((jour) => {
      if (jour.jour !== "Samedi" && jour.jour !== "Dimanche") {
        jour.presence = presence;
      }
      return jour;
    });
    this.setState({
      cra: [...cra],
    });
  }

  render() {
    return (
      <GridContainer>
        <Segment.Group>
          <Header
            as="h3"
            block
            attached="top"
            textAlign="center"
            content="Créer vos CRA plus facilement"
          />
          <Grid padded textAlign="center">
            <Grid.Row>
              <Grid.Column width={16}>
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
                  cra={this.state.cra}
                />
                <Checkbox
                  label="Séléctionner tous les jours ouvrés"
                  onChange={this.selectAll}
                />
                <br />
                <br />
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
                  cra={this.state.cra}
                  name={this.state.name}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
      </GridContainer>
    );
  }
}

export default App;
