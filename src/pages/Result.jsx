import React, { useContext } from "react";

import Container from "@mui/material/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";

import { DataGrid } from "@mui/x-data-grid";

import { ProcessedDataContext } from "../contexts/ProcessedData";

const Result = () => {
  const {
    state: { loading, data },
  } = useContext(ProcessedDataContext);

  return (
    <Container maxWidth="lg" sx={{ paddingY: "40px" }}>
      <Typography>Resultados da análise</Typography>

      <Button variant="contained" sx={{ mb: "10px" }}>
        nova análise
      </Button>

      <DataGrid
        autoHeight
        loading={loading}
        rows={data}
        columns={[
          { field: "id", headerName: "id" },
          { field: "service", headerName: "Serviço" },
          { field: "food", headerName: "Comida" },
          { field: "result", headerName: "Resultado" },
        ]}
      />
    </Container>
  );
};

export default Result;
