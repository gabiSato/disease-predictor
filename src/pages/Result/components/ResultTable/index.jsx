import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import TableToolbar from "../TableToolbar";
import { LOCALE_TEXT } from "./localeTextConstants";

const ROWS_PER_PAGE = 8;

const ResultTable = ({ loading, data }) => {
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE);

  const columns = [
    { field: "id", headerName: "id" },
    { field: "microregiao", headerName: "Microregião", flex: 1 },
    { field: "prevalencia", headerName: "Prevalencia", flex: 1 },
    { field: "idh", headerName: "IDH", flex: 1 },
    { field: "qes", headerName: "QES", flex: 1 },
    {
      field: "result",
      headerName: "Resultado",
      flex: 1,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value * 100).toLocaleString();

        return `${valueFormatted} %`;
      },
      valueParser: (value) => Number(value) / 100,
    },
  ];

  const onPageSizeChange = (newPageSize) => setPageSize(newPageSize);

  return (
    <DataGrid
      columns={columns}
      rows={data}
      loading={loading}
      autoHeight
      pagination
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      rowsPerPageOptions={[ROWS_PER_PAGE]}
      disableSelectionOnClick
      hideFooterSelectedRowCount
      disableDensitySelector
      disableColumnSelector
      localeText={LOCALE_TEXT}
      components={{
        Toolbar: TableToolbar,
      }}
    />
  );
};

export default ResultTable;
