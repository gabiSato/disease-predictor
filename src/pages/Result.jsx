import React, { useContext, useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";

import { DataGrid } from "@mui/x-data-grid";

import { ProcessedDataContext } from "../contexts/ProcessedData";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const HEADERS = [
  { id: "id", label: "id" },
  { id: "microregiao", label: "Microregião" },
  { id: "prevalencia", label: "Prevalencia" },
  { id: "idh", label: "IDH" },
  { id: "qes", label: "QES" },
  { id: "result", label: "LTA" },
];

const ROWS_PER_PAGE = 10;

const Result = () => {
  const {
    state: { loading, data },
  } = useContext(ProcessedDataContext);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);

  const handleClick = (event, id) => {};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - data.length) : 0;

  return (
    <Container maxWidth="lg" sx={{ paddingY: "40px" }}>
      <Typography>Resultados da análise</Typography>

      <Button variant="contained" sx={{ mb: "10px" }}>
        nova análise
      </Button>

      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {HEADERS.map((headCell) => (
                  <TableCell key={headCell.id} align="center">
                    {headCell.label}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(
                  page * ROWS_PER_PAGE,
                  page * ROWS_PER_PAGE + ROWS_PER_PAGE
                )
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.microregiao}</TableCell>
                      <TableCell align="center">{row.prevalencia}</TableCell>
                      <TableCell align="center">{row.idh}</TableCell>
                      <TableCell align="center">{row.qes}</TableCell>
                      <TableCell align="center">{row.result}</TableCell>
                      <TableCell align="center">visualizar</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={ROWS_PER_PAGE}
            page={page}
            rowsPerPageOptions={[]}
            onPageChange={handleChangePage}
          />
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Result;
