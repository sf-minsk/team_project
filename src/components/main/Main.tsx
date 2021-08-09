import React, {ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState} from 'react';
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
import {CardsInitialStateType, createPackTC, deletePackTC, setCardPacksTC} from '../../bll/cards-reducer';
import Button from '@material-ui/core/Button';
import {Theme} from '@material-ui/core/styles/createTheme';
import {AppStatusType} from '../../bll/app-reducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ErrorSnackbar} from '../../features/errors/ErrorSnackbar';
import {trimmedString} from "../../utils/trimmedString-util";
import {updateDate} from "../../utils/updateDate-util";
import Modal from '@material-ui/core/Modal/Modal';
import {saveState} from "../../utils/localStorage-util";


export const Main: React.FC = React.memo(() => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)
    const id = useSelector<AppRootStateType, string>(state => state.profile._id)
    const appStatus = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)
    const [searchText, setSearchText] = useState(cards.searchText)
    const [sliderValue, setSliderValue] = useState<number[]>([cards.min, cards.max])

    useEffect(() => {
        dispatch(setCardPacksTC())
    }, [dispatch])

    useEffect(() => {
        saveState({
            cards: {
                cardPacks: [],
                myPacks: cards.myPacks,
                page: cards.page,
                pageCount: cards.pageCount,
                min: cards.min,
                max: cards.max,
                minCardsCount: cards.minCardsCount,
                maxCardsCount: cards.maxCardsCount,
                sortPacksDirection: cards.sortPacksDirection,
                sortBy: cards.sortBy,
                user_id: cards.user_id,
                packName: cards.packName,
                searchText: cards.searchText,
                cardPacksTotalCount: cards.cardPacksTotalCount,
            }
        })
    }, [cards])

    const onMyButtonClick = () => {
        dispatch(setCardPacksTC({user_id: id, min: 0, page: 1}))
        setSliderValue([0, cards.max])
    }
    const onAllButtonClick = () => {
        dispatch(setCardPacksTC({user_id: '', min: sliderValue[0], max: sliderValue[1], page: 1}))
    }
    const changeSliderValue = (e: ChangeEvent<{}>, newValue: number | number[]) => {
        setSliderValue(newValue as number[])
    }
    const changeSliderValueForPayload = () => {
        dispatch(setCardPacksTC({min: sliderValue[0], max: sliderValue[1]}))
    }
    const handleChangePage = (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setCardPacksTC({page: newPage + 1}))
    }
    const handleChangePageCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setCardPacksTC({pageCount: parseInt(e.target.value, 10)}))
    }
    const onClickSortHandler = (sortValue: SortByType) => {
        if (cards.sortPacksDirection === 0) {
            dispatch(setCardPacksTC({sortPacks: '1' + sortValue}))
        } else {
            dispatch(setCardPacksTC({sortPacks: '0' + sortValue}))
        }
    }
    const onSearchButtonHandler = () => {
        dispatch(setCardPacksTC({packName: searchText}))
    }
    const onSearchKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && onSearchButtonHandler()
    }
    const addNewPackHandler = () => {
        dispatch(createPackTC({cardsPack: {name: searchText}}))
        setSearchText('')
    }
    const onDeleteButtonClickHandler = (packId: string) => {
        dispatch(deletePackTC(packId))
    }


    return (
        <Container>
            <Paper className={classes.paper}>
                <Modal open={appStatus === 'loading'}>
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: '100%'
                    }}>
                        <CircularProgress/>
                    </div>
                </Modal>
                <Grid className={classes.navBar}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px'}}>Show packs cards</span>
                    <ButtonGroup variant="contained" color="primary" style={{marginTop: '20px'}}>
                        <Button onClick={onMyButtonClick}
                                variant={cards.myPacks ? 'contained' : 'outlined'}>My</Button>
                        <Button onClick={onAllButtonClick}
                                variant={cards.myPacks ? 'outlined' : 'contained'}>All</Button>
                    </ButtonGroup>
                    <Slider
                        style={{marginTop: '50px', width: '150px'}}
                        value={sliderValue}
                        max={cards.maxCardsCount}
                        onChange={changeSliderValue}
                        onChangeCommitted={changeSliderValueForPayload}
                        valueLabelDisplay="auto"
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
                            onChange={e => setSearchText(e.target.value)}
                            onKeyPress={onSearchKeyPressHandler}
                            value={searchText}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Button onClick={onSearchButtonHandler}>
                                            <SearchIcon/>
                                        </Button>
                                    </InputAdornment>
                                ),
                                endAdornment: searchText && (
                                    <IconButton
                                        style={{height: '40px'}}
                                        aria-label="toggle password visibility"
                                        onClick={() => {
                                            dispatch(setCardPacksTC({packName: ''}))
                                            setSearchText('')
                                        }}
                                    >
                                        <CancelRoundedIcon/>
                                    </IconButton>
                                )
                            }}
                        />
                        <Button
                            style={{width: '230px', marginLeft: '20px'}}
                            variant="contained"
                            color="primary"
                            onClick={addNewPackHandler}
                        >
                            Add new pack
                        </Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell onClick={() => onClickSortHandler('name')}>
                                        <Button variant={cards.sortBy === 'name' ? 'outlined' : 'text'}>
                                            Name
                                        </Button>
                                    </TableCell>
                                    <TableCell onClick={() => onClickSortHandler('cardsCount')}
                                               align="right">
                                        <Button variant={cards.sortBy === 'cardsCount' ? 'outlined' : 'text'}>
                                            Cards
                                        </Button>
                                    </TableCell>
                                    <TableCell onClick={() => onClickSortHandler('updated')} align="right">
                                        <Button variant={cards.sortBy === 'updated' ? 'outlined' : 'text'}>
                                            Last Updated
                                        </Button>
                                    </TableCell>
                                    <TableCell onClick={() => onClickSortHandler('created')} align="right">
                                        <Button variant={cards.sortBy === 'created' ? 'outlined' : 'text'}>
                                            Created By
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    cards.cardPacks.map((card) => (
                                            <TableRow key={card._id}>
                                                <TableCell component='th'
                                                >{trimmedString(card.name)}</TableCell>
                                                <TableCell align="right">{card.cardsCount}</TableCell>
                                                <TableCell align="right">{updateDate(card.updated)}</TableCell>
                                                <TableCell align="right">{trimmedString(card.user_name)}</TableCell>
                                                <TableCell align="right" style={{width: '224px'}}>
                                                    <span style={{
                                                        display: 'flex',
                                                        width: '224px',
                                                        justifyContent: 'flex-end'
                                                    }}>
                                                        {card.user_id === id &&
                                                        <span>
                                                            <Button onClick={() => onDeleteButtonClickHandler(card._id)}
                                                                    size={'small'} color={'secondary'}
                                                                    variant={'outlined'}>Delete</Button>
                                                            <Button size={'small'} variant={'outlined'}
                                                                    style={{margin: '0 10px'}}>Edit</Button>
                                                        </span>
                                                        }
                                                        <Button size={'small'}
                                                                variant={'outlined'}>Learn</Button></span>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <td style={{
                                        display: 'flex',
                                        height: '53px',
                                        marginLeft: '10px',
                                        alignItems: 'center'
                                    }}>
                                        Page: {cards.page}
                                    </td>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, {
                                            label: 'All',
                                            value: cards.cardPacksTotalCount
                                        }]}
                                        colSpan={6}
                                        count={cards.cardPacksTotalCount}
                                        rowsPerPage={cards.pageCount}
                                        page={cards.page - 1}
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
})

type SortByType = 'name' | 'cardsCount' | 'updated' | 'created'
const useStyles = makeStyles(() => ({
    paper: {
        marginTop: '20px',
        marginBottom: '60px',
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
    onPageChange: (e: MouseEvent<HTMLButtonElement>, newPage: number) => void
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

    const handleFirstPageButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, 0)
    }

    const handleBackButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, page - 1)
    }

    const handleNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, page + 1)
    }

    const handleLastPageButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
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