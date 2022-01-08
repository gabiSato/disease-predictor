import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@material-ui/core/Typography";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Container maxWidth="lg">
          <Typography variant="h6">
            Sistema Fuzzy de Análise Epidemiologica
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
