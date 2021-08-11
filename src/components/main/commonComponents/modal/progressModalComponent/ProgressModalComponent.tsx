import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../../bll/store';
import {AppStatusType} from '../../../../../bll/app-reducer';

export const ProgressModalComponent: React.FC = React.memo(() => {


    const appStatus = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)

    return (
        <>
            {appStatus === 'loading' &&
            <div style={{position: 'fixed', bottom: '0', left: '0', height: '100%', width: '100%', zIndex: 1}}>
                <div style={{position: 'absolute', left: '50%', top: '50%', width: '100%'}}>
                    <CircularProgress/>
                </div>
            </div>
            }


        </>
    )
})