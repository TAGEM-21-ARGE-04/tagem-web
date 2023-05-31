import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({ rows, columns }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
                columns.map(col => (
                    <TableCell key={col.id}>{col.name}</TableCell>
                ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow   
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                {
                    columns.map(col => (
                        <TableCell  key={col.id} component="th" scope="row">
                            {col.customAccesor ?  col.customAccesor(row) : row[col.accesor]}
                        </TableCell>
                    ))
                }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
