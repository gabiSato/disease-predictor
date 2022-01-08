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
  const [image, setImage] = useState(null);
  const [microregion, setMicroregion] = useState(null);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "id" },
      {
        field: "microrregiao",
        headerName: "Microrregião",
        flex: 1,
      },
      {
        field: "prevalencia",
        headerName: "Prevalência",
        flex: 1,
      },
      {
        field: "idh",
        headerName: "IDH",
        flex: 1,
      },
      {
        field: "cses",
        headerName: "CSES",
        flex: 1,
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
              setOpen(true);
              setImage(params.row?.image);
              setMicroregion(params.row?.microregiao);
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

  const handleClose = () => setOpen(false);

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

      <ChartModal
        open={open}
        onClose={handleClose}
        image={image}
        microregion={microregion}
      />
    </React.Fragment>
  );
};

export default ResultTable;
