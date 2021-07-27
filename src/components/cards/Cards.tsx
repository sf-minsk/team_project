import React from "react";
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';

export const Cards = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    // if (!isLoggedIn) {
    //     return <Redirect to={'/login'}/>
    // }

    return (
        <div>Cards</div>
    )
}