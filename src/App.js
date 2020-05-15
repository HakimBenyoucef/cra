import React, { Component } from "react";
import "./App.css";
import Day from "./Components/Day";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import { Table } from "semantic-ui-react";
import GridContainer from "./Components/GridContainer";
import FormCalendar from "./Components/FormCalendar";

const joursApiDate = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
// I've created two arrays because of the first index of Date.prototype.getDay() corresponds to sunday (and my calendar start in monday)
const joursCalendar = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

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

  getDaysOfMonth(month, year) {
    const monthIndex = month;
    const namesApi = Object.freeze(joursApiDate);
    const date = new Date(year, monthIndex, 1);
    const result = [];
    while (date.getMonth() === monthIndex) {
      result.push({ numero: date.getDate(), jour: namesApi[date.getDay()] });
      date.setDate(date.getDate() + 1);
    }

    this.getDataWeek(result);
    return result;
  }

  getDataWeek(data) {
    const firstDayIndex = joursCalendar.indexOf(data[0].jour);
    const decalage = 7 - firstDayIndex;
    if (firstDayIndex > 0) {
      this.dataWeek1 = [];
      for (let i = 0; i < firstDayIndex; i++) {
        this.dataWeek1.push({});
      }

      // ajouter dans tab1 les 7 - firstDayIndex elements

      this.dataWeek1 = this.dataWeek1.concat(
        data.filter((jour, index) => index < decalage)
      );
      this.dataWeek2 = data.filter(
        (jour, index) => index >= decalage && index < decalage + 7
      );

      this.dataWeek3 = data.filter(
        (jour, index) => index >= decalage + 7 && index < decalage + 14
      );
      this.dataWeek4 = data.filter(
        (jour, index) => index >= decalage + 14 && index < decalage + 21
      );
      this.dataWeek5 = data.filter(
        (jour, index) => index >= decalage + 21 && index < decalage + 28
      );
      this.dataWeek6 = data.filter((jour, index) => index >= decalage + 28);
    } else {
      this.dataWeek1 = data.filter((jour, index) => index < 7);
      this.dataWeek2 = data.filter((jour, index) => index > 6 && index < 14);
      this.dataWeek3 = data.filter((jour, index) => index > 13 && index < 21);
      this.dataWeek4 = data.filter((jour, index) => index > 20 && index < 28);
      this.dataWeek5 = data.filter((jour, index) => index >= 28);
    }
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
    this.getDaysOfMonth(this.state.month + 1, this.state.year);
    return (
      <GridContainer>
        <Table color={"blue"} key={"blue"} collapsing>
          <Table.Header>
            <Table.Row>
              {joursCalendar.map((jour) => (
                <Table.HeaderCell width={3} textAlign="center" key={jour}>
                  {jour}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              {this.dataWeek1.map((day) => (
                <Table.Cell>
                  <Day day={day.numero} />
                </Table.Cell>
              ))}
            </Table.Row>
            <Table.Row>
              {this.dataWeek2.map((day) => (
                <Table.Cell>
                  <Day day={day.numero} />
                </Table.Cell>
              ))}
            </Table.Row>
            <Table.Row>
              {this.dataWeek3.map((day) => (
                <Table.Cell>
                  <Day day={day.numero} />
                </Table.Cell>
              ))}
            </Table.Row>
            <Table.Row>
              {this.dataWeek4.map((day) => (
                <Table.Cell>
                  <Day day={day.numero} />
                </Table.Cell>
              ))}
            </Table.Row>
            {this.dataWeek5 && this.dataWeek5.length > 0 && (
              <Table.Row>
                {this.dataWeek5.map((day) => (
                  <Table.Cell>
                    <Day day={day.numero} />
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
            {this.dataWeek6 && this.dataWeek6.length > 0 && (
              <Table.Row>
                {this.dataWeek6.map((day) => (
                  <Table.Cell>
                    <Day day={day.numero} />
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
        </Table>

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
