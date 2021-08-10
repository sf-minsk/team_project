import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {ModalComponent} from '../commonComponents/ModalComponent';
import Container from '@material-ui/core/Container/Container';
import {Input} from '../commonComponents/Input';
import TableContainer from '@material-ui/core/TableContainer';
import {ErrorSnackbar} from '../../../features/errors/ErrorSnackbar';
import {useStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {setPackTC} from '../../../bll/pack-reducer';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {PackNameTable} from './pack/PackNameTable';
import {useLocation} from 'react-router-dom';
import {AppRootStateType} from '../../../bll/store';
import {CardsInitialStateType} from '../../../bll/cards-reducer';


export const PackName: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)
    const packID = useLocation().pathname.substring(6)

    let packName = 'Pack name'
    if (cards.cardPacks.length) {
        packName = cards.cardPacks.filter(card => card._id === packID)[0].name
    }

    useEffect(() => {
        dispatch(setPackTC({cardsPack_id: packID}))
    }, [dispatch, packID])


    return (
        <Container>
            <Paper className={classes.paper}>
                <ModalComponent/>
                <Container className={classes.body}>
                    <KeyboardBackspaceIcon/>
                    <div className={classes.packListHeading}>{packName}</div>
                    <div className={classes.inputButtonSection}>
                        <Input/>
                        <Input/>
                    </div>
                    <TableContainer component={Paper}>
                        <PackNameTable labelRowsPerPage={'Cards per page'}/>
                    </TableContainer>
                </Container>
            </Paper>
            <ErrorSnackbar/>
        </Container>
    )
})