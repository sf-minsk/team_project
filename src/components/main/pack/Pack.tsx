import React, {useCallback, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {ProgressModalComponent} from '../commonComponents/modal/progressModalComponent/ProgressModalComponent';
import Container from '@material-ui/core/Container/Container';
import {Input} from '../commonComponents/Input';
import TableContainer from '@material-ui/core/TableContainer';
import {ErrorSnackbar} from '../../../features/errors/ErrorSnackbar';
import {useStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {PackInitialStateType, setPackTC} from '../../../bll/pack-reducer';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {PackTable} from './pack/PackTable';
import {useHistory, useLocation} from 'react-router-dom';
import {AppRootStateType} from '../../../bll/store';
import {CardsInitialStateType, setCardPacksTC} from '../../../bll/packs-reducer';
import {saveState} from "../../../utils/localStorage-util";
import {OnePackType} from "../../../dal/cards-api";


export const Pack: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const pack = useSelector<AppRootStateType, PackInitialStateType>(state => state.pack)
    const packs = useSelector<AppRootStateType, CardsInitialStateType>(state => state.packs)
    const packID = useLocation().pathname.substring(6)

    let packName = pack.currentPackName
    if (packs.cardPacks.length) {
        packName = packs.cardPacks.filter(card => card._id === packID)[0].name
    }

    useEffect(() => {
        dispatch(setPackTC({cardsPack_id: packID}))
    }, [dispatch, packID])

    useEffect(() => {
        saveState({
            pack: {...pack, currentPackName: packName}
        })
    }, [pack])


    const onClickHandler = useCallback(() => {
        history.goBack()
    }, [history])

    return (
        <Container>
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
                        <Input/>
                        <Input/>
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