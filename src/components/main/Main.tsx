import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {ErrorSnackbar} from '../../features/errors/ErrorSnackbar';
import Container from '@material-ui/core/Container/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slider from '@material-ui/core/Slider';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import withStyles from '@material-ui/styles/withStyles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
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
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {CardsPackDataType} from '../../dal/cards-api';
import {setCardsPackTC} from '../../bll/cards-reducer';
import Button from '@material-ui/core/Button';
import {Theme} from '@material-ui/core/styles/createTheme';



export const Main: React.FC = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, Array<CardsPackDataType>>(state => state.cards)

    let [myButtonClicked, setMyButtonClicked] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [sliderValue, setSliderValue] = useState<number[]>([10, 80])
    const [page, setPage] = useState(0)
    const [cardsPerPage, setCardsPerPage] = useState(5)
    let [sortPacks, setSortPacks] = useState<0 | 1>(0)


    useEffect(() => {
        dispatch(setCardsPackTC(1, 5000, 0, 'updated'))
    }, [dispatch])


    const onMyButtonClick = () => {
        setMyButtonClicked(true)
    }
    const onAllButtonClick = () => {
        setMyButtonClicked(false)
    }

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

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        //alert('Hello')
        //setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let currentCardsPerPage = parseInt(event.target.value, 10)
        setCardsPerPage(currentCardsPerPage)
        dispatch(setCardsPackTC(1, currentCardsPerPage, sortPacks, 'updated')) //нужно убрать хардкод 'updated'
    }

    const onClickSortHandler = (sortValue: string) => {
        let value = sortPacks
        if (sortPacks === 0) {
            setSortPacks(1)
            value = 1
        } else {
            setSortPacks(0)
            value = 0
        }
        dispatch(setCardsPackTC(page, cardsPerPage, value, sortValue))
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
                                    <StyledTableCell onClick={() => onClickSortHandler('name')}>Name</StyledTableCell>
                                    <StyledTableCell onClick={() => onClickSortHandler('cardsCount')} align="right">Cards</StyledTableCell>
                                    <StyledTableCell onClick={() => onClickSortHandler('updated')} align="right">Last
                                        Updated</StyledTableCell>
                                    <StyledTableCell onClick={() => onClickSortHandler('created')} align="right">Created
                                        By</StyledTableCell>
                                    <StyledTableCell align="right">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(cardsPerPage > 0
                                        ? cards.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)
                                        : cards
                                ).map((card) => (
                                    <StyledTableRow key={card._id}>
                                        <StyledTableCell component="th" scope="row">{card.name}</StyledTableCell>
                                        <StyledTableCell align="right">{card.cardsCount}</StyledTableCell>
                                        <StyledTableCell align="right">{card.updated}</StyledTableCell>
                                        <StyledTableCell align="right">{card.created}</StyledTableCell>
                                        {/*<StyledTableCell align="right">{card.actions}</StyledTableCell>*/}
                                    </StyledTableRow>
                                ))}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        //results={sortPacks}
                                        //property={sortValue}
                                        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                        colSpan={3}
                                        count={cards.length}
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

const useStyles = makeStyles(() => ({
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
}))

type SortValueType = 'name' | 'cardsCount' | 'updated' | 'created'

type TablePaginationActionsProps = {
    count: number
    rowsPerPage: number
    page: number
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

    const dispatch = useDispatch()
    let [currentPage, setCurrentPage] = useState(1)

    const classes = useStyles1()
    const theme = useTheme()

    const {count, rowsPerPage, page, onPageChange} = props

    const handleFirstPageButtonClick = () => {
        dispatch(setCardsPackTC(1, rowsPerPage))
    }

    const handleBackButtonClick = () => {
        let newPage = currentPage - 1
        setCurrentPage(newPage)
        dispatch(setCardsPackTC(newPage, rowsPerPage))
    }

    const handleNextButtonClick = () => {
        let newPage = currentPage + 1
        setCurrentPage(newPage)
        dispatch(setCardsPackTC(newPage, rowsPerPage))
    }

    const handleLastPageButtonClick = () => {
        let newPage = Math.max(Math.ceil(count / rowsPerPage))
        setCurrentPage(newPage)
        dispatch(setCardsPackTC(newPage, rowsPerPage))
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                // disabled={currentPage === 1}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                // disabled={currentPage === 1}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                // disabled={currentPage >= Math.ceil(count / rowsPerPage) -1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                // disabled={currentPage >= Math.ceil(count / rowsPerPage) -1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    )
}