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
import {CardPacksResponseType} from '../../dal/cards-api';
import {setCardPacksTC} from '../../bll/cards-reducer';
import Button from '@material-ui/core/Button';
import {Theme} from '@material-ui/core/styles/createTheme';
import {RequestStatusType} from "../../bll/app-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";

type SortByType = 'name' | 'cardsCount' | 'updated' | 'created'

export const Main: React.FC = () => {

    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const classes = useStyles();
    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, CardPacksResponseType>(state => state.cards)
    const id = useSelector<AppRootStateType, string | null>(state => state.profile._id)

    const [packName, setPackName] = useState('')
    const [myButtonClicked, setMyButtonClicked] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(5)
    const [sliderValue, setSliderValue] = useState<number[]>([10, 80])
    const [sliderValueForPayload, setSliderValueForPayload] = useState<number[]>([sliderValue[0], sliderValue[1]])
    const [sortPacksDirection, setSortPacksDirection] = useState(0)
    const [sortBy, setSortBy] = useState<SortByType>('updated')


    const [userId, setUserId] = useState<string | null>('')


    useEffect(() => {
        dispatch(setCardPacksTC(setValuesInPayload()))
    }, [dispatch, packName, sortPacksDirection, sortBy, page, pageCount, userId, sliderValueForPayload])

    const setValuesInPayload = () => {
        return {
            packName: packName,
            min: sliderValue[0],
            max: sliderValue[1],
            sortPacks: JSON.stringify(sortPacksDirection) + sortBy,
            page: page,
            pageCount: pageCount,
            user_id: userId,
        }
    }

    const onMyButtonClick = () => {
        setUserId(id)
        setMyButtonClicked(true)
    }
    const onAllButtonClick = () => {
        setUserId('')
        setMyButtonClicked(false)
    }

    const changeSliderValue = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setSliderValue(newValue as number[])
    }
    const changeSliderValueForPayload = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setSliderValueForPayload(newValue as number[])
    }


    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage + 1)
    }

    const handleChangePageCount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPageCount(parseInt(event.target.value, 10))
    }

    const onClickSortHandler = (sortValue: SortByType) => {
        setSortBy(sortValue)
        if (sortPacksDirection === 0) {
            setSortPacksDirection(1)
        } else {
            setSortPacksDirection(0)
        }
    }

    const updateDate = (cardUpdateDate: string) => {
        let formatedDate = new Date(cardUpdateDate)
        return  formatedDate.toLocaleString('es', {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
        })
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
                        style={{marginTop: '50px', width: '150px'}}
                        value={sliderValue}
                        onChange={changeSliderValue}
                        onChangeCommitted={changeSliderValueForPayload}
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
                                    <TableCell onClick={() => onClickSortHandler('name')}>
                                        <Button variant={sortBy === 'name' ? "outlined" : 'text'}>
                                            Name
                                        </Button>
                                    </TableCell>
                                    <TableCell onClick={() => onClickSortHandler('cardsCount')}
                                               align="right">
                                        <Button variant={sortBy === 'cardsCount' ? "outlined" : 'text'}>
                                            Cards
                                        </Button>
                                    </TableCell>
                                    <TableCell onClick={() => onClickSortHandler('updated')} align="right">
                                        <Button variant={sortBy === 'updated' ? "outlined" : 'text'}>
                                            Last Updated
                                        </Button>
                                    </TableCell>
                                    <TableCell onClick={() => onClickSortHandler('created')} align="right">
                                        <Button variant={sortBy === 'created' ? "outlined" : 'text'}>
                                            Created By
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requestStatus === 'loading' ? <div
                                        style={{
                                            display: 'flex',
                                            position: 'absolute',
                                            left: '50%',
                                            top: '50%',
                                            textAlign: 'center',
                                            width: '100%'
                                        }}>
                                        <CircularProgress/></div> :
                                    cards.cardPacks.map((card) => (
                                            <TableRow key={card._id}>
                                                <TableCell component="th"
                                                           scope="row">{card.name}</TableCell>
                                                <TableCell align="right">{card.cardsCount}</TableCell>
                                                <TableCell
                                                    align="right">{updateDate(card.updated)}</TableCell>
                                                <TableCell align="right">{card.user_name}</TableCell>
                                                <TableCell align="right"><Button
                                                    variant={"outlined"}>Learn</Button></TableCell>
                                            </TableRow>
                                        )
                                    )
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <div style={{
                                        display: 'flex',
                                        height: '53px',
                                        marginLeft: '10px',
                                        alignItems: 'center'
                                    }}>
                                        Page: {page}
                                    </div>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, {
                                            label: 'All',
                                            value: cards.cardPacksTotalCount
                                        }]}
                                        colSpan={6}
                                        count={cards.cardPacksTotalCount}
                                        rowsPerPage={pageCount}
                                        page={page - 1}
                                        SelectProps={{
                                            inputProps: {'aria-label': 'rows per page'},
                                            native: true,
                                        }}
                                        labelRowsPerPage={'Cards per Page'}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangePageCount}
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

    const classes = useStyles1()
    const theme = useTheme()
    const {count, rowsPerPage, page, onPageChange} = props

    const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0)
    }

    const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
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
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
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