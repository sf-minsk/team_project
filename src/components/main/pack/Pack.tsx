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
import {trimmedString} from "../../../utils/trimmedString-util";


export const Pack: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const pack = useSelector<AppRootStateType, PackInitialStateType>(state => state.pack)
    const packs = useSelector<AppRootStateType, CardsInitialStateType>(state => state.packs)
    const packID = useLocation().pathname.substring(6)
    const cardsPack_id = pack.cardsPack_id
    const idUser = useSelector<AppRootStateType, string>(state => state.profile._id)
    const [cardQuestion, setCardQuestion] = useState<string>('')
    const [cardAnswer, setCardAnswer] = useState<string>('')
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout>()

    const searchQuestionHandler = (value: string) => {
        if (intervalID) {
            clearInterval(intervalID)
        }
        setCardQuestion(value)
        const newIntervalID = setTimeout(() => {
            dispatch(setPackTC({cardQuestion: value, cardAnswer: cardAnswer, page: 1}))
        }, 800)
        setIntervalID(newIntervalID)
    }
    const searchAnswerHandler = (value: string) => {
        if (intervalID) {
            clearInterval(intervalID)
        }
        setCardAnswer(value)
        const newIntervalID = setTimeout(() => {
            dispatch(setPackTC({cardQuestion: cardQuestion, cardAnswer: value, page: 1}))
        }, 800)
        setIntervalID(newIntervalID)
    }

    let packName = pack.currentPackName
    if (packs.cardPacks.length) {
        packName = packs.cardPacks.filter(card => card._id === packID)[0].name
    }
    useEffect(() => {
        dispatch(setPackTC({cardsPack_id: packID, page: 1, pageCount: 5, cardQuestion: '', cardAnswer: ''}))
        return function () {
            setCardQuestion('')
            setCardAnswer('')
        }
    }, [dispatch, packID])

    useEffect(() => {
        saveState({
            pack: {...pack, currentPackName: packName, cards: []}
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
                    <div className={classes.packListHeading}>{trimmedString(packName, 50)}</div>
                    <div className={classes.inputButtonSection}>
                        <Input
                            placeholderValue={'Search by questions'}
                            value={cardQuestion}
                            dispatchHandler={searchQuestionHandler}
                        />
                        <Input
                            placeholderValue={'Search by answer'}
                            value={cardAnswer}
                            dispatchHandler={searchAnswerHandler}
                        />
                        <Button
                            style={{width: '330px'}}
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
                        <PackTable labelRowsPerPage={'Cards per page'}/>
                    </TableContainer>
                </Container>
            </Paper>
            <ErrorSnackbar/>
        </Container>
    )
})