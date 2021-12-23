import React, { useState, useMemo } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Button from "@material-ui/core/Button";

import { LOCALE_TEXT } from "./localeTextConstants";

import TableToolbar from "../TableToolbar";
import ChartModal from "../ChartModal";

const ROWS_PER_PAGE = 8;

const ResultTable = ({ loading, data }) => {
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE);
  const [open, setOpen] = useState(false);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "id" },
      {
        field: "microregiao",
        headerName: "Microregião",
        flex: 1,
      },
      {
        field: "prevalencia",
        headerName: "Prevalencia",
        flex: 1,
        valueFormatter: (params) => Number(params.value).toLocaleString(),
      },
      {
        field: "idh",
        headerName: "IDH",
        flex: 1,
        valueFormatter: (params) => Number(params.value).toLocaleString(),
      },
      {
        field: "qes",
        headerName: "QES",
        flex: 1,
        valueFormatter: (params) => Number(params.value).toLocaleString(),
      },
      {
        field: "result",
        headerName: "Resultado",
        flex: 1,
        valueFormatter: (params) => {
          return Number(params.value * 100).toLocaleString();
        },
      },
      {
        field: "actions",
        flex: 1,
        type: "actions",
        getActions: (params) => [
          <Button
            onClick={() => {
              console.log(params.row?.result);
              setOpen(true);
            }}
          >
            vizualizar
          </Button>,
        ],
      },
    ],
    []
  );

  const onPageSizeChange = (newPageSize) => setPageSize(newPageSize);

  return (
    <React.Fragment>
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

      <ChartModal open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
  );
};

export default ResultTable;
