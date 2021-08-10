import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal/Modal';
import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../bll/store';
import {AppStatusType} from '../../../bll/app-reducer';
import {useStyles} from '../styles';

export const ModalComponent: React.FC = React.memo(() => {

    const classes = useStyles();

    const appStatus = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)

    return(
        <Modal open={appStatus === 'loading'}>
            <div className={classes.modalComponentStyle}>
                <CircularProgress/>
            </div>
        </Modal>
    )
})