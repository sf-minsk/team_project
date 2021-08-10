import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {ModalComponent} from '../ModalComponent';
import Container from '@material-ui/core/Container/Container';
import {Input} from '../packsList/packs/Input';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import {ErrorSnackbar} from '../../../features/errors/ErrorSnackbar';
import {useStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {PackNameTableHead} from './pack/PackNameTableHead';
import {PackNameTableBody} from './pack/PackNameTableBody';
import {PackNameTableFooter} from './pack/PackNameTableFooter';
import {PackInitialStateType, setPackTC} from '../../../bll/pack-reducer';
import {AppRootStateType} from '../../../bll/store';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {CardsInitialStateType} from '../../../bll/cards-reducer';

export const PackName: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)
    const pack = useSelector<AppRootStateType, PackInitialStateType>(state => state.pack)

    useEffect(() => {
        dispatch(setPackTC({
            cardsPack_id: '61113dd19572f10004bd2612'
        }))
    }, [dispatch])

    return (
        <Container>
            <Paper className={classes.paper}>
                <ModalComponent/>
                <Container className={classes.body}>
                    <KeyboardBackspaceIcon />
                    <div className={classes.packsListHeading}>Packs name</div>
                    <div className={classes.inputButtonSection}>
                        <Input/>
                        <Input/>
                    </div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <PackNameTableHead/>
                            <PackNameTableBody/>
                            <PackNameTableFooter/>
                        </Table>
                    </TableContainer>
                </Container>
            </Paper>
            <ErrorSnackbar/>
        </Container>
    )
})