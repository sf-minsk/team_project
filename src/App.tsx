import React, {useEffect} from 'react';
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Main} from './components/main/Main';
import {Registration} from './components/auth/registration/Registration';
import {Login} from './components/auth/login/Login';
import {ForgotPassword} from './components/auth/forgotPassword/ForgotPassword';
import {Profile} from "./components/profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {initializeAppTC} from "./bll/app-reducer";
import {CircularProgress} from "@material-ui/core";
import {NewPassword} from "./components/auth/forgotPassword/NewPassword";
import {logoutTC} from "./bll/auth-reducer";
import {PrivateRoute} from './features/privateRoute/PrivateRoute';
import {Error404} from './features/error404/Error404';
import {Header} from "./components/header/Header";

function App() {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const obLogOutClick = () => {
        dispatch(logoutTC())
    }


    return (
        <>
            <div>
                <button><NavLink to='/'>Main</NavLink></button>
                <button><NavLink to='/registration'>Register</NavLink></button>
                <button><NavLink to='/login'>Login</NavLink></button>
                <button><NavLink to='/changepassword'>Change Password</NavLink></button>
                <button><NavLink to='/profile'>Profile</NavLink></button>
                <span style={{color: `${isInitialized ? 'green' : 'red'}`}}> (INITIALIZED) </span>
                <span style={{color: `${isLoggedIn ? 'green' : 'red'}`}}> (LOGIN) </span>
                <span style={{color: `${isRegistered ? 'green' : 'red'}`}}> (REGISTERED) </span>
                <button onClick={obLogOutClick}>LOGOUT</button>
            </div>
            <Header/>
            <div>
                <Switch>
                    <PrivateRoute exact path="/" isLoggedIn={isLoggedIn} render={() => <Main/>} redirectTo="/login"/>
                    <PrivateRoute path="/profile" isLoggedIn={isLoggedIn} render={() => <Profile/>}
                                  redirectTo="/login"/>
                    <PrivateRoute path="/login" isLoggedIn={!isLoggedIn} render={() => <Login/>} redirectTo="/"/>
                    <PrivateRoute path="/registration" isLoggedIn={!isLoggedIn} render={() => <Registration/>}
                                  redirectTo="/"/>

                    <Route exact path={'/changepassword'} render={() => <ForgotPassword/>}/>
                    <Route path={'/changepassword/newpassword/:token?'} render={() => <NewPassword/>}/>
                    <Route path={'/404'} render={() => <Error404/>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </div>
        </>
    );
}

export default App;


// <Route path="/admin" render={ () => (isAuth ? ( <> <Route path="/admin/categories" component={() => <CategoriesAdmin setStore={setStore} store={store} setAppSide={setAppSide} />} /> <Route path="/admin/words/:id" component={() => <Words setStore={setStore} store={store} setAppSide={setAppSide} />} /> </> ) : <Redirect to={'/main'}/>)} />