import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {ErrorSnackbar} from '../../features/errors/ErrorSnackbar';
import Container from '@material-ui/core/Container/Container';
import {Button, ButtonGroup, Slider, TableHead,} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import withStyles from '@material-ui/styles/withStyles/withStyles';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


export const Main = () => {

    let [myButtonClicked, setMyButtonClicked] = useState(true)
    const onMyButtonClick = () => {
        setMyButtonClicked(true)
    }
    const onAllButtonClick = () => {
        setMyButtonClicked(false)
    }

    const classes = makeStyles(() => ({
        paper: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            minHeight: '800px',
            minWidth: '1000px',
        },
        navBar: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '240px',
            backgroundColor: 'lightblue',
            borderRadius: '4px 0px 0px 4px',
        },
        body: {
            margin: '10px 15px 10px 15px',
        },
        table: {
            minWidth: 700,
        },
    }))()

    const [searchValue, setSearchValue] = useState('')
    const [sliderValue, setSliderValue] = useState<number[]>([10, 80])
    const [page, setPage] = useState(0)
    const [cardsPerPage, setCardsPerPage] = useState(5)

    const changeSliderValue = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setSliderValue(newValue as number[])
    }

    const StyledTableCell = withStyles((theme: Theme) => ({
        head: {
            // backgroundColor: theme.palette.common.black,
            // color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell)

    const StyledTableRow = withStyles((theme: Theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                // backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow)

    function createData(name: string, cards: number, lastUpdated: number, createdBy: string, actions?: any) {
        return {name, cards, lastUpdated, createdBy, actions}
    }

    const rows = [
        createData('Pack 1', 1, 23, 'das', ''),
        createData('Pack 2', 12, 21, 'dadas', ''),
        createData('Pack 3', 312, 11, 'dasdas', ''),
        createData('Pack 4', 12, 13, 'dasda', ''),
        createData('Pack 5', 32, 2, 'gdfdg', ''),
        createData('Pack 6', 14, 13, 'dfgdfsaf', ''),
        createData('Pack 7', 72, 34, 'hfjhg', ''),
        createData('Pack 8', 51, 44, 'sdfa', ''),
        createData('Pack 9', 51, 44, 'sdfa', ''),
        createData('Pack 10', 51, 44, 'sdfa', ''),
        createData('Pack 11', 51, 44, 'sdfa', ''),
        createData('Pack 12', 51, 44, 'sdfa', ''),
        createData('Pack 13', 51, 44, 'sdfa', ''),
        createData('Pack 14', 51, 44, 'sdfa', ''),
        createData('Pack 15', 51, 44, 'sdfa', ''),
        createData('Pack 16', 51, 44, 'sdfa', ''),
        createData('Pack 17', 51, 44, 'sdfa', ''),
        createData('Pack 18', 51, 44, 'sdfa', ''),
        createData('Pack 19', 51, 44, 'sdfa', ''),
        createData('Pack 20', 51, 44, 'sdfa', ''),
        createData('Pack 21', 51, 44, 'sdfa', ''),
        createData('Pack 22', 51, 44, 'sdfa', ''),
        createData('Pack 23', 51, 44, 'sdfa', ''),
        createData('Pack 24', 51, 44, 'sdfa', ''),
        createData('Pack 25', 51, 44, 'sdfa', ''),
        createData('Pack 26', 51, 44, 'sdfa', ''),
        createData('Pack 27', 51, 44, 'sdfa', ''),
        createData('Pack 28', 51, 44, 'sdfa', ''),
        createData('Pack 29', 51, 44, 'sdfa', ''),
    ]

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCardsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }


    return (
        <Container>
            <Paper className={classes.paper}>
                <Grid className={classes.navBar}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px'}}>Show packs cards</span>
                    <ButtonGroup variant="contained" color="primary" style={{marginTop: '20px'}}>
                        <Button onClick={onMyButtonClick}
                                variant={myButtonClicked ? 'contained' : 'outlined'}>My</Button>
                        <Button onClick={onAllButtonClick}
                                variant={myButtonClicked ? 'outlined' : 'contained'}>All</Button>
                    </ButtonGroup>
                    <Slider
                        style={{marginTop: '50px', width: '160px'}}
                        value={sliderValue}
                        onChange={changeSliderValue}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                        // getAriaValueText={value}
                    />
                </Grid>
                <Container className={classes.body}>
                    <div style={{fontSize: '30px', fontWeight: 'bold'}}>Packs list</div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>

                        <TextField
                            style={{height: '40px'}}
                            placeholder="Search"
                            type="text"
                            variant="outlined"
                            fullWidth
                            size="small"
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),

                                endAdornment: searchValue && (
                                    <IconButton
                                        style={{height: '40px'}}
                                        aria-label="toggle password visibility"
                                        onClick={() => setSearchValue('')}
                                    >
                                        <CancelRoundedIcon/>
                                    </IconButton>
                                )
                            }}
                        />
                        <Button style={{width: '180px'}} variant="contained" color="primary">Add new pack</Button>
                    </div>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Cards</StyledTableCell>
                                    <StyledTableCell align="right">Last Updated</StyledTableCell>
                                    <StyledTableCell align="right">Created By</StyledTableCell>
                                    <StyledTableCell align="right">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(cardsPerPage > 0
                                        ? rows.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)
                                        : rows
                                ).map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                                        <StyledTableCell align="right">{row.cards}</StyledTableCell>
                                        <StyledTableCell align="right">{row.lastUpdated}</StyledTableCell>
                                        <StyledTableCell align="right">{row.createdBy}</StyledTableCell>
                                        <StyledTableCell align="right">{row.actions}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={cardsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {'aria-label': 'rows per page'},
                                            native: true,
                                        }}
                                        labelRowsPerPage={'Cards per Page'}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>
                </Container>
            </Paper>
            <ErrorSnackbar/>
        </Container>
    )
}

type TablePaginationActionsProps = {
    count: number
    page: number
    rowsPerPage: number
    onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void
}

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
)

export const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const classes = useStyles1()
    const theme = useTheme()
    const {count, page, rowsPerPage, onPageChange} = props

    const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    }

    const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    }

    const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    }

    const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    )
}