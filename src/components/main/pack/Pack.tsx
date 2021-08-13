import React, {useCallback, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {ProgressModalComponent} from '../commonComponents/modal/progressModalComponent/ProgressModalComponent';
import Container from '@material-ui/core/Container/Container';
import {Input} from '../commonComponents/Input';
import TableContainer from '@material-ui/core/TableContainer';
import {ErrorSnackbar} from '../../../features/errors/ErrorSnackbar';
import {useStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {createCardTC, PackInitialStateType, setPackTC} from '../../../bll/pack-reducer';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {PackTable} from './pack/PackTable';
import {useHistory, useLocation} from 'react-router-dom';
import {AppRootStateType} from '../../../bll/store';
import {CardsInitialStateType} from '../../../bll/packs-reducer';
import {saveState} from "../../../utils/localStorage-util";
import Button from "@material-ui/core/Button";
import {AddCardModal} from "../commonComponents/modal/addCardModal/AddCardModal";
import {AppStatusType} from "../../../bll/app-reducer";


export const Pack: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const pack = useSelector<AppRootStateType, PackInitialStateType>(state => state.pack)
    const packs = useSelector<AppRootStateType, CardsInitialStateType>(state => state.packs)
    const packID = useLocation().pathname.substring(6)
    const cardsPack_id = pack.cardsPack_id
    const status = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)
    const idUser = useSelector<AppRootStateType, string>(state => state.profile._id)
    const searchAnswer = pack.searchTextAnswer
    const searchQuestion = pack.cardQuestion

    let packName = pack.currentPackName
    if (packs.cardPacks.length) {
        packName = packs.cardPacks.filter(card => card._id === packID)[0].name
    }

    useEffect(() => {
        dispatch(setPackTC({cardsPack_id: packID, page: 1}))
    }, [dispatch, packID])

    useEffect(() => {
        saveState({
            pack: {...pack, currentPackName: packName}
        })
    }, [packName, pack])


    const onClickHandler = useCallback(() => {
        history.goBack()
    }, [history])

    const [addPackModal, setAddPackModal] = useState<boolean>(false)
    const openAddPackModal = () => {
        setAddPackModal(true)
    }
    const closeAddPackModal = () => {
        setAddPackModal(false)
    }

    const addNewCard = (question: string, answer: string) => {
        dispatch(createCardTC({cardsPack_id: cardsPack_id, question, answer}))
    }
    const setSearchAnswerTextInput = (searchText: string) => {
        dispatch(setPackTC({cardsPack_id: cardsPack_id, cardAnswer: searchText}))
    }
    const setSearchQuestionTextInput = (searchText: string) => {
        dispatch(setPackTC({cardsPack_id: cardsPack_id, cardQuestion: searchText}))
    }


    return (
        <Container className={classes.container}>
            {addPackModal && <AddCardModal
                closeAddPackModal={closeAddPackModal}
                addNewCard={addNewCard}
            />}
            <Paper className={classes.paper}>
                <ProgressModalComponent/>
                <Container className={classes.body}>

                    <div style={{display: 'inline-flex', alignItems: 'center', cursor: 'pointer'}}
                         onClick={onClickHandler}>
                        <KeyboardBackspaceIcon/>
                        <div style={{marginLeft: '10px'}}>
                            <h3>Back to packs</h3>
                        </div>
                    </div>

                    <div className={classes.packListHeading}>{packName}</div>
                    <div className={classes.inputButtonSection}>
                        <Input
                            placeholderValue={'Search by questions'}
                            searchTextRequest={searchQuestion}
                            setTextTC={setSearchQuestionTextInput}

                        />
                        <Input
                            placeholderValue={'Search by answer'}
                            setTextTC={setSearchAnswerTextInput}
                            searchTextRequest={searchAnswer}
                        />
                        <Button
                            className={classes.addNewCardButton}
                            variant="contained"
                            color="primary"
                            onClick={openAddPackModal}
                            disabled={pack.packUserId !== idUser}
                        >
                            Add new card
                        </Button>
                    </div>
                    <TableContainer style={{marginTop: '20px'}} component={Paper}>
                        {(status === 'loading') ?
                            <div
                                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                                {/*<CircularProgress/>*/}
                            </div> : <PackTable labelRowsPerPage={'Cards per page'}/>}
                    </TableContainer>
                </Container>
            </Paper>
            <ErrorSnackbar/>
        </Container>
    )
})