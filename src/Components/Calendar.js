import React, { Component } from "react";
import Day from "./Day";
import "semantic-ui-css/semantic.min.css";
import { Table } from "semantic-ui-react";

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

class Calendar extends Component {
  state = { months: [] };

  componentDidMount() {
    let result = this.getDaysOfMonth(this.props.month, this.props.year);
    this.props.setDays(result);
    this.props.fillCra(result);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.month !== prevProps.month ||
      this.props.year !== prevProps.year
    ) {
      let result = this.getDaysOfMonth(this.props.month, this.props.year);
      this.props.setDays(result);
      this.props.fillCra(result);
    }
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

    this.setState({ months: result });
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

  render() {
    return (
      <Table color={"blue"} key={"blue"}>
        <Table.Header>
          <Table.Row>
            {joursCalendar.map((jour) => (
              <Table.HeaderCell textAlign="center" key={jour}>
                {jour}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            {this.dataWeek1 &&
              this.dataWeek1.map((day) => (
                <Table.Cell key={day.numero}>
                  <Day
                    selected={
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0] &&
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0].presence === 1
                    }
                    updateCra={this.props.updateCra}
                    day={day.numero}
                  />
                </Table.Cell>
              ))}
          </Table.Row>
          <Table.Row>
            {this.dataWeek2 &&
              this.dataWeek2.map((day) => (
                <Table.Cell key={day.numero}>
                  <Day
                    selected={
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0] &&
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0].presence === 1
                    }
                    updateCra={this.props.updateCra}
                    day={day.numero}
                  />
                </Table.Cell>
              ))}
          </Table.Row>
          <Table.Row>
            {this.dataWeek3 &&
              this.dataWeek3.map((day) => (
                <Table.Cell key={day.numero}>
                  <Day
                    selected={
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0] &&
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0].presence === 1
                    }
                    updateCra={this.props.updateCra}
                    day={day.numero}
                  />
                </Table.Cell>
              ))}
          </Table.Row>
          <Table.Row>
            {this.dataWeek3 &&
              this.dataWeek4.map((day) => (
                <Table.Cell key={day.numero}>
                  <Day
                    selected={
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0] &&
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0].presence === 1
                    }
                    updateCra={this.props.updateCra}
                    day={day.numero}
                  />
                </Table.Cell>
              ))}
          </Table.Row>
          {this.dataWeek5 && this.dataWeek5.length > 0 && (
            <Table.Row>
              {this.dataWeek5.map((day) => (
                <Table.Cell key={day.numero}>
                  <Day
                    selected={
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0] &&
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0].presence === 1
                    }
                    updateCra={this.props.updateCra}
                    day={day.numero}
                  />
                </Table.Cell>
              ))}
            </Table.Row>
          )}
          {this.dataWeek6 && this.dataWeek6.length > 0 && (
            <Table.Row>
              {this.dataWeek6.map((day) => (
                <Table.Cell key={day.numero}>
                  <Day
                    selected={
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0] &&
                      this.props.cra.filter(
                        (jour) => jour.numero === day.numero
                      )[0].presence === 1
                    }
                    updateCra={this.props.updateCra}
                    day={day.numero}
                  />
                </Table.Cell>
              ))}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  }
}

export default Calendar;
