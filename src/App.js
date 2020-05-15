import React, { Component } from "react";
import "./App.css";
import Day from "./Components/Day";
import "semantic-ui-css/semantic.min.css";
import Moment from "moment";
import { Table, Card } from "semantic-ui-react";
import GridContainer from "./Components/GridContainer";

const jours = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
class App extends Component {
  getDaysOfMonth(month, year) {
    const monthIndex = month - 1;
    const names = Object.freeze(jours);
    const date = new Date(year, monthIndex, 1);
    const result = [];
    while (date.getMonth() == monthIndex) {
      result.push({ numero: date.getDate(), jour: names[date.getDay()] });
      date.setDate(date.getDate() + 1);
    }

    this.getDataWeek(result);
    return result;
  }

  getDataWeek(data) {
    this.dataWeek1 = data.filter((jour, index) => index < 7);
    this.dataWeek2 = data.filter((jour, index) => index > 6 && index < 14);
    this.dataWeek3 = data.filter((jour, index) => index > 13 && index < 21);
    this.dataWeek4 = data.filter((jour, index) => index > 20 && index < 28);
    this.dataWeek5 = data.filter((jour, index) => index >= 28);
  }

  render() {
    let days = this.getDaysOfMonth(2, 2020);
    let nbrJour = 0;
    return (
      <GridContainer>
        <Table color={"blue"} key={"blue"} collapsing>
          <Table.Header>
            <Table.Row>
              {jours.map((jour) => (
                <Table.HeaderCell width={3} textAlign="center">
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
            {this.dataWeek5.length && (
              <Table.Row>
                {this.dataWeek5.map((day) => (
                  <Table.Cell>
                    <Day day={day.numero} />
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </GridContainer>
    );
  }
}

export default App;
