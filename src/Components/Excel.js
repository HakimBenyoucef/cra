import React, { Component } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
import { aggregateBy, process } from "@progress/kendo-data-query";
import products from "./products.json";

//https://www.telerik.com/kendo-react-ui/components/excelexport/
//https://stackblitz.com/run/?file=app%2Fmain.jsx
//https://stackblitz.com/run/?file=app%2Fmain.jsx
export default class Excel extends Component {
  aggregates = [{ field: "presence", aggregate: "sum" }];

  total = aggregateBy(this.props.cra, this.aggregates);

  CustomGroupFooter = (props) => `SUM: 4`;

  CustomFooter = (props) => `Total: 3`;
  render() {
    return (
      <ExcelExport
        data={this.props.cra}
        fileName={"CRA-" + this.props.month + "-" + this.props.name + ".xlsx"}
        ref={(exporter) => {
          this.props.setExporter(exporter);
        }}
      >
        <ExcelExportColumn
          cellOptions={{ textAlign: "center" }}
          field="jour"
          title={this.props.month}
          width={100}
          footerCellOptions={{ wrap: true, textAlign: "center" }}
          footer={() => "Total"}
        />
        <ExcelExportColumn
          cellOptions={{ textAlign: "center" }}
          field="presence"
          title="Présence"
          width={100}
          footerCellOptions={{ wrap: true, textAlign: "center" }}
          footer={() =>
            this.props.cra.reduce((acc, obj) => acc + obj.presence, 0)
          }
        />
      </ExcelExport>
    );
  }
}
