import React, { Component } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";

//https://www.telerik.com/kendo-react-ui/components/excelexport/
//https://stackblitz.com/run/?file=app%2Fmain.jsx
//https://stackblitz.com/run/?file=app%2Fmain.jsx
export default class Excel extends Component {

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
          field="numero"
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
