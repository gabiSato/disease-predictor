import React from "react";

import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

const TableToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{ fileName: "resultado" }}
        printOptions={{ fileName: "resultado" }}
      />
    </GridToolbarContainer>
  );
};

export default TableToolbar;
