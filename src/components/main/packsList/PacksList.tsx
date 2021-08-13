import {useStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../bll/store';
import {CardsInitialStateType, createPackTC, setCardPacksTC} from '../../../bll/packs-reducer';
import React, {useEffect, useState} from 'react';
import {saveState} from '../../../utils/localStorage-util';
import Paper from '@material-ui/core/Paper';
import {ProgressModalComponent} from '../commonComponents/modal/progressModalComponent/ProgressModalComponent';
import {NavBar} from './packs/NavBar';
import Container from '@material-ui/core/Container/Container';
import {Input} from '../commonComponents/Input';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import {PacksListTable} from './packs/PacksListTable';
import {ErrorSnackbar} from '../../../features/errors/ErrorSnackbar';
import {AddPackModal} from '../commonComponents/modal/addPackModal/AddPackModal';

export const PacksList: React.FC = React.memo(() => {

    //const {searchText, setSearchText} = props
    const classes = useStyles();
    const dispatch = useDispatch()

    const packs = useSelector<AppRootStateType, CardsInitialStateType>(state => state.packs)

    useEffect(() => {
        dispatch(setCardPacksTC())
    }, [dispatch])

    useEffect(() => {
        saveState({
            packs: {
                cardPacks: [],
                myPacks: packs.myPacks,
                page: packs.page,
                pageCount: packs.pageCount,
                min: packs.min,
                max: packs.max,
                minCardsCount: packs.minCardsCount,
                maxCardsCount: packs.maxCardsCount,
                sortPacksDirection: packs.sortPacksDirection,
                sortBy: packs.sortBy,
                user_id: packs.user_id,
                packName: packs.packName,
                searchText: packs.searchText,
                cardPacksTotalCount: packs.cardPacksTotalCount,
            }
        })
    }, [packs])


    const [addPackModal, setAddPackModal] = useState<boolean>(false)
    const openAddPackModal = () => {
        setAddPackModal(true)
    }
    const closeAddPackModal = () => {
        setAddPackModal(false)
    }
    const addNewPack = (newPackName: string) => {
        dispatch(createPackTC({cardsPack: {name: newPackName}}))
    }

    const setSearchTextInput = (searchText: string) => {
        dispatch(setCardPacksTC({packName: searchText}))
    }


    return (
        <Container className={classes.container}>
            {addPackModal && <AddPackModal
                closeAddPackModal={closeAddPackModal}
                addNewPack={addNewPack}
            />}
            <Paper className={classes.paper}>
                <ProgressModalComponent/>
                <NavBar/>
                <Container className={classes.body}>
                    <div className={classes.packListHeading}>Packs list</div>
                    <div className={classes.inputButtonSection}>
                        <Input
                            placeholderValue={'Search by pack'}
                            searchTextRequest={packs.searchText}
                            setTextTC={setSearchTextInput}
                        />
                        <Button
                            className={classes.addNewPackButton}
                            variant="contained"
                            color="primary"
                            onClick={openAddPackModal}
                        >
                            Add new pack
                        </Button>
                    </div>
                    <TableContainer style={{marginTop: '20px'}} component={Paper}>
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