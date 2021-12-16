import React, { useContext } from "react";

import Container from "@mui/material/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";

import { ProcessedDataContext } from "../../contexts/ProcessedData";

import ResultTable from "./components/ResultTable";

const Result = () => {
  const {
    state: { loading, data },
    action: { processFile },
  } = useContext(ProcessedDataContext);

  const handleProcessData = (e) => {
    const file = e.target.files[0];

    processFile(file.path);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: "40px" }}>
      <Typography
        component="h1"
        sx={{ fontSize: "24px", fontWeight: 500, mb: "24px" }}
      >
        Resultados da análise
      </Typography>

      <label htmlFor="csv-file-upload">
        <Input
          id="csv-file-upload"
          type="file"
          inputProps={{ accept: ".csv" }}
          sx={{ display: "none" }}
          onChange={handleProcessData}
        />

        <Button variant="contained" component="span" sx={{ mb: "10px" }}>
          nova análise
        </Button>
      </label>

      <ResultTable loading={loading} data={data} />
    </Container>
  );
};

export default Result;
