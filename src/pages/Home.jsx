import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Container from "@mui/material/Container";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Box from "@mui/material/Box";

import { ProcessedDataContext } from "../contexts/ProcessedData";

const Home = () => {
  let navigate = useNavigate();

  const {
    state: { loading, data },
    action: { processFile },
  } = useContext(ProcessedDataContext);

  useEffect(() => {
    if (!loading && !!data?.length) {
      navigate("/resultado");
    }
  }, [loading, data]);

  const handleProcessData = (e) => {
    const file = e.target.files[0];

    processFile(file.path);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: "40px" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          FuzzyS
        </Typography>

        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Analise a probabilidade de ocorrencia de leishmaniose
        </Typography>

        <label htmlFor="csv-file-upload">
          <Input
            id="csv-file-upload"
            type="file"
            inputProps={{ accept: ".csv" }}
            sx={{ display: "none" }}
            onChange={handleProcessData}
          />

          <Button variant="contained" component="span" size="medium">
            carregar arquivo
          </Button>
        </label>
      </Box>
    </Container>
  );
};

export default Home;
