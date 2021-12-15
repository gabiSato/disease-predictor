import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const HEADERS = [
  { id: "id", label: "id" },
  { id: "microregiao", label: "Microregião" },
  { id: "prevalencia", label: "Prevalencia" },
  { id: "idh", label: "IDH" },
  { id: "qes", label: "QES" },
  { id: "result", label: "LTA" },
];

const ROWS_PER_PAGE = 8;

// export function renderButton(params) {
//   return (
//     <Button variant="text">visualizar</Button>
//   );
// }

const ResultTable = ({ data_ }) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - data_.length) : 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            {HEADERS.map((headCell) => (
              <TableCell key={headCell.id} align="center">
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data_
            .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
            .map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.microregiao}</TableCell>
                  <TableCell align="center">{row.prevalencia}</TableCell>
                  <TableCell align="center">{row.idh}</TableCell>
                  <TableCell align="center">{row.qes}</TableCell>
                  <TableCell align="center">{row.result}</TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data_.length}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        rowsPerPageOptions={[]}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default ResultTable;
