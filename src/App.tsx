import React, {useEffect} from 'react';
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Cards} from './components/cards/Cards';
import {Registration} from './components/auth/registration/Registration';
import {Login} from './components/auth/login/Login';
import {ForgotPassword} from './components/auth/forgotPassword/ForgotPassword';
import {Profile} from "./components/profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {initializeAppTC} from "./bll/app-reducer";
import {CircularProgress} from "@material-ui/core";
import {NewPassword} from "./components/auth/forgotPassword/NewPassword";

function App() {
    let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch]);
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return(
        <>
            <div>
                <button><NavLink to='/'>Home</NavLink></button>
                <button><NavLink to='/registration'>Register</NavLink></button>
                <button><NavLink to='/login'>Login</NavLink></button>
                <button><NavLink to='/changepassword'>Change Password</NavLink></button>
                <button><NavLink to='/profile'>Profile</NavLink></button>
            </div>
            <div>
                <Switch>
                    <Route exact path={'/'} render={() => <Cards/>}/>
                    <Route path={'/registration'} render={() => <Registration/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route exact path={'/changepassword'} render={() => <ForgotPassword/>}/>
                    <Route path={'/changepassword/newpassword/:token?'} render={() => <NewPassword/>}/>
                    <Route path={'/profile'} render={() => <Profile/>}/>
                    <Redirect from={'*'} to={'/'}/>
                </Switch>
            </div>

        </>
    );
}

export default App;
