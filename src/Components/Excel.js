import React, { Component } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
import { aggregateBy, process } from "@progress/kendo-data-query";
import products from "./products.json";

const aggregates = [{ field: "UnitPrice", aggregate: "sum" }];
const group = [{ field: "Discontinued", aggregates: aggregates }];

const total = aggregateBy(products, aggregates);

const CustomGroupHeader = (props) => `Discontinued: ${props.value}`;

const CustomGroupFooter = (props) =>
  `SUM: \$ ${props.aggregates.UnitPrice.sum.toFixed(2)}`;

const CustomFooter = (props) =>
  `Total ${props.column.title}: \$ ${total.UnitPrice.sum}`;
  
const data = products;
//https://www.telerik.com/kendo-react-ui/components/excelexport/
export default class Excel extends Component {
  render() {
    return (
      <ExcelExport
        data={data}
        fileName={"CRA-"+this.props.month+".xlsx"}
        ref={(exporter) => {
          this.props.setExporter(exporter);
        }}
      >
        <ExcelExportColumn field="Jour" title={this.props.month} width={100} />
        <ExcelExportColumn field="Presence" title="Présence" width={100} />
      </ExcelExport>
    );
  }
}
