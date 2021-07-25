import React from 'react';
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Cards} from './components/cards/Cards';
import {Registration} from './components/auth/registration/Registration';
import {Login} from './components/auth/login/Login';
import {ForgotPassword} from './components/auth/forgotPassword/ForgotPassword';

function App() {
    return (
        <>

            <div>
                <button><NavLink to='/'>Home</NavLink></button>
                <button><NavLink to='/registration'>Register</NavLink></button>
                <button><NavLink to='/login'>Login</NavLink></button>
                <button><NavLink to='/changepassword'>Change Password</NavLink></button>
            </div>
            <div>
                <Switch>
                    <Route exact path={'/'} render={() => <Cards/>}/>
                    <Route path={'/registration'} render={() => <Registration/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/changepassword'} render={() => <ForgotPassword/>}/>
                    <Redirect from={'*'} to={'/'}/>
                </Switch>
            </div>

        </>
    );
}

export default App;
