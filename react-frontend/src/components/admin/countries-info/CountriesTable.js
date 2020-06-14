import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { getUserAccessToken } from '../../session-managment/utils';
import AmountButton from '../countries-info/AmountButton'
import './CountriesTable.css'

const columns = [
    { id: 'idCountry', label: '#' },
    { id: 'flag', label: 'Flag' },
    { id: 'name', label: 'Name' },
    { id: 'iso2', label: 'ISO2', align: 'center' },
    {
        id: 'buttonCheckAmount',
        label: 'Amount of interested persons',
        align: 'center',
    }
];

const createData = (idCountry, flag, name, iso2, buttonCheckAmount) => {
    return { idCountry, flag, name, iso2, buttonCheckAmount };
};

const prepareToShow = (countries) => countries.map(country => {
    return createData(
        country.id,
        <img src={`https://www.countryflags.io/${country.iso_2}/shiny/32.png`} alt={country.name} />,
        country.name,
        country.iso_2,
        <AmountButton idCountry={country.id} iso2={country.iso_2} countryName={country.name} />);
});

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const CountriesTable = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getUserAccessToken(),
            }
        });

        const fetchData = async () => {
            const response = await axiosInstance.get('/countries?page=1&limit=253');
            const listOfCountries = response.data.data
            const countriesRows = prepareToShow(listOfCountries);
            setRows(countriesRows);
        }

        fetchData();
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="auth-wrapper-table">
            <div className="auth-inner-table">
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
}

export default CountriesTable;