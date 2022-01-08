import React, { useContext } from "react";
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
    action: { processFile },
  } = useContext(ProcessedDataContext);

  const handleProcessData = (e) => {
    const file = e.target.files[0];

    processFile(file.path);

    navigate("/resultado");
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
          Sistema Fuzzy de Análise Epidemiologica
        </Typography>

        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Analise a probabilidade de ocorrencia de leishmaniose
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: "60%", mt: "32px" }}
        >
          Para começar, caregue um arquivo .csv com as colunas:{" "}
          <strong>microrregiao, prevalencia, idh e cses</strong>. Lembre-se de
          colocar os dados numéricos separados por <strong>"."</strong> em vez
          de <strong>","</strong>.
          <br />
          Veja o exemplo abaixo:
        </Typography>

        <Box
          sx={{
            width: "320px",
            background: "#f4f2f0",
            borderRadius: "4px",
            p: "20px",
            color: "#7d7a77",
            wordSpacing: "4px",
            lineHeight: "28px",
            mb: "52px",
          }}
        >
          <span>
            microrregiao, prevalencia, idh, cses
            <br />
            óbidos, 0.038, 0.601, 172.00
            <br />
            santarém, 0.040, 0.487, 547.00
            <br />
            almeirim, 0.034, 0.573, 59.00
            <br />
          </span>
        </Box>

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
