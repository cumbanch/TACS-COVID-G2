import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { getUserAccessToken } from '../../session-managment/utils';
import NextButton from './NextButton';
import './UsersInfo.css';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const columns = [
    { id: 'user', label: 'User' },
    {
        id: 'selectUserButton',
        label: 'Select',
        align: 'center'
    }
];

const createData = (user, selectUserButton) => {
    return { user, selectUserButton };
};

const SelectAnUser = (props) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [userSelected, setUserSelected] = useState({});

    const otherHandleNext = (user) => {
        props.handleNext(user);
        setUserSelected(user);
    }

    const prepareToShow = (users) => users.map(user => {
        return createData(
            user.email,
            <NextButton content={user} handleNext={otherHandleNext} />
        )
    });

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getUserAccessToken(),
            }
        });

        const fetchUsers = async () => {
            const response = await axiosInstance.get('/users?page=1&limit=100&order_column=id&order_type=ASC');
            const listOfUsers = response.data.data;
            const firstUserSelected = props.userToExclude;
            const usersWithFirstUserExcluded = listOfUsers.filter(user => {
                return JSON.stringify(user) !== JSON.stringify(firstUserSelected)
            });
            const usersRows = prepareToShow(usersWithFirstUserExcluded);
            setRows(usersRows);
        }

        fetchUsers();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.email}
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
                rowsPerPageOptions={[10]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default SelectAnUser;
