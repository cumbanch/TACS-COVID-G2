import React, { useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';



const ComparisonItemComponent = (props) => {
    const [params, setParams] = useState({ flag: props.flag, rows: props.rows, id: props.id });
    console.log("comparisonitem")
    console.log(props);
    console.log(params);
    const useStyles = makeStyles({
        table: {
            minWidth: 150
        },
    });
    const classes = useStyles();
    return (
        <div style={{ paddingTop: 30, paddingRight: 30 }}>

            <TableContainer component={Paper} style={{ width: 300, maxHeight: 200 }}>
                <img src={params.flag} style={{ borderRadius: "20px", width: "120px", height: "70px", paddingTop: 10 }} />
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Deaths</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {params.rows.map((row) => (
                            <TableRow key={row.date + row.id}>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">{row.deaths}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}
export default ComparisonItemComponent;