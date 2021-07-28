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
import {logoutTC} from "./bll/auth-reducer";

function App() {
    let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    let isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
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
    const obLogOutClick = () => {
        dispatch(logoutTC())
    }
    return (
        <>
            <div>
                <button><NavLink to='/'>Home</NavLink></button>
                <button><NavLink to='/registration'>Register</NavLink></button>
                <button><NavLink to='/login'>Login</NavLink></button>
                <button><NavLink to='/changepassword'>Change Password</NavLink></button>
                <button><NavLink to='/profile'>Profile</NavLink></button>
                <span style={{color: `${isInitialized ? 'green' : 'red'}`}}> (INITIALIZED) </span>
                <span style={{color: `${isLoggedIn ? 'green' : 'red'}`}}> (LOGIN) </span>
                <span style={{color: `${isRegistered ? 'green' : 'red'}`}}> (REGISTERED) </span>
                <button onClick={obLogOutClick}>LOGOUT</button>
            </div>

            <div>
                <Switch>
                    <Route exact path="/" render={ () => (isLoggedIn
                        ? <Route exact path={'/'} render={() => <Cards/>}/>
                        : <Redirect to={'/login'}/>)} />
                    <Route exact path="/profile" render={ () => (isLoggedIn
                        ? <Route exact path={'/profile'} render={() => <Profile/>}/>
                        : <Redirect to={'/login'}/>)} />
                    <Route exact path="/login" render={() => (!isLoggedIn
                        ? <Route exact path={'/login'} render={() => <Login/>}/>
                        : <Redirect to={'/'}/>)}/>
                    <Route exact path="/registration" render={() => (!isLoggedIn
                        ? <Route exact path={'/registration'} render={() => <Registration/>}/>
                        : <Redirect to={'/'}/>)}/>
                    <Route exact path={'/changepassword'} render={() => <ForgotPassword/>}/>
                    <Route path={'/changepassword/newpassword/:token?'} render={() => <NewPassword/>}/>
                    <Redirect from={'*'} to={'/'}/>
                </Switch>
            </div>
        </>
    );
}

export default App;




// <Route path="/admin" render={ () => (isAuth ? ( <> <Route path="/admin/categories" component={() => <CategoriesAdmin setStore={setStore} store={store} setAppSide={setAppSide} />} /> <Route path="/admin/words/:id" component={() => <Words setStore={setStore} store={store} setAppSide={setAppSide} />} /> </> ) : <Redirect to={'/main'}/>)} />