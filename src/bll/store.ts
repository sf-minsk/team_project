import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk'
import {LoginActionsType, loginReducer} from './login-reducer';
import {RegisterActionsType, registerReducer} from './register-reducer';
import {ChangePasswordActionsType, changePasswordReducer} from './changePassword-reducer';
import {AppActionsType, appReducer} from './app-reducer';


const rootReducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    changePassword: changePasswordReducer,
    app: appReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducers>
export type AppRootActionsType =
    | LoginActionsType
    | RegisterActionsType
    | ChangePasswordActionsType
    | AppActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store;
