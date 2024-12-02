import React from 'react';
import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const Table = ({ columns, rows }) => (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <MuiTable>
            <TableHead>
                <TableRow>
                    {columns.map((col, index) => (
                        <TableCell key={index}>{col}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </MuiTable>
    </Paper>
);

export default Table;
