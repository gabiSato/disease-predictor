import React from "react";

import { Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@mui/material/Box";

import { ProcessedDataProvider } from "./contexts/ProcessedData";

import Header from "./components/Header";

import Result from "./pages/Result";
import Home from "./pages/Home";

const App = () => {
  const theme = createTheme({}, ptBR);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 64px)",
          // backgroundColor: "secondary.main",
          // color: "#fff",
        }}
      >
        <ProcessedDataProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resultado" element={<Result />} />
          </Routes>
        </ProcessedDataProvider>
      </Box>
    </ThemeProvider>
  );
};

export default App;
