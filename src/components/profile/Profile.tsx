import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Redirect} from "react-router-dom";

export const Profile = () => {
    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return (
        <div>Profile</div>
    )
}