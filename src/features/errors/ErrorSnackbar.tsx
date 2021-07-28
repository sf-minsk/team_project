import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import React from 'react';
import {setAppErrorAC} from '../../bll/app-reducer';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from "@material-ui/lab";


export function ErrorSnackbar() {

    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}