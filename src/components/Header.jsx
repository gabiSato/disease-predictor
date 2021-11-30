import React from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@material-ui/core/Typography";

const Header = () => {
  return (
    <Toolbar>
      <Container maxWidth="lg">
        <Typography variant="h6">FuzzyS</Typography>
      </Container>
    </Toolbar>
  );
};

export default Header;
