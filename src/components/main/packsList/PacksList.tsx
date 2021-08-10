import {useStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../bll/store';
import {CardsInitialStateType, createPackTC, setCardPacksTC} from '../../../bll/cards-reducer';
import React, {useCallback, useEffect} from 'react';
import {saveState} from '../../../utils/localStorage-util';
import Paper from '@material-ui/core/Paper';
import {ModalComponent} from '../commonComponents/ModalComponent';
import {NavBar} from './packs/NavBar';
import Container from '@material-ui/core/Container/Container';
import {Input} from '../commonComponents/Input';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import {PacksListTable} from './packs/PacksListTable';
import {ErrorSnackbar} from '../../../features/errors/ErrorSnackbar';

export const PacksList: React.FC = React.memo(() => {

    //const {searchText, setSearchText} = props
    const classes = useStyles();
    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)

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


    const addNewPackHandler = useCallback(() => {
        dispatch(createPackTC({cardsPack: {name: 'New pack'}}))
        // setSearchText('')
    }, [dispatch])


    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <ModalComponent/>
                <NavBar/>
                <Container className={classes.body}>
                    <div className={classes.packListHeading}>Packs list</div>
                    <div className={classes.inputButtonSection}>
                        <Input/>
                        <Button
                            className={classes.addNewPackButton}
                            variant="contained"
                            color="primary"
                            onClick={addNewPackHandler}
                        >
                            Add new pack
                        </Button>
                    </div>
                    <TableContainer component={Paper}>
                        <PacksListTable labelRowsPerPage={'Packs per page'}/>
                    </TableContainer>
                </Container>
            </Paper>
            <ErrorSnackbar/>
        </Container>
    )
})

// type PacksListPropsType = {
//     searchText: string
//     setSearchText: (searchText: string) => void
// }