import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

const columns = [
    {id: 'Rank', label: 'Rank', minWidth: 100},
    {id: 'Name', label: 'Name', minWidth: 170},
    {id: 'Score', label: 'Score', minWidth: 100},

];

function createData(Rank,  Name, Score) {
    return { Rank,  Name, Score };
}

const rows = [
    createData(1, 'IN', 1324171354),
    createData(2, 'CN', 1403500365),
    createData(3, 'IT', 60483973),
    createData(4, 'US', 327167434),
    createData(5, 'CA', 37602103),
    createData(6, 'AU', 25475400),
    createData(7, 'DE', 8301920),
    createData(8, 'IE', 4857000),
    createData(9, 'MX', 126577691),
    createData(10, 'JP', 126317000)
];

const useStyles = makeStyles({
    root: {
        width: '80%',
    },
    container: {
        maxHeight: 440,
    },
});



export default function StickyHeadTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [tableData, setTableData] = React.useState([]);
    console.log('-->', props.classId)
    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.token,
            },
        }
        const body = {
            classId:props.classId,
        }
        axios.get("http://localhost:5000/api/classroom/leaderboard", body, config).then(res =>{
            console.log("&&&",res.data)
            setTableData(res.data)
        }).catch(err => console.log(err))
    },[])

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

                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: 'black', color: 'white' }}
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
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
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
                rowsPerPageOptions={[4, 8, 10 ]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

