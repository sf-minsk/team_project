import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk'
import {authReducer, LoginActionsType} from './auth-reducer';
import {RegisterActionsType, registerReducer} from './register-reducer';
import {ChangePasswordActionsType, changePasswordReducer} from './changePassword-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import {profileReducer} from "./profile-reducer";
import {setNewPasswordActionTypes, setNewPasswordReducer} from "./setNewPassword-reducer";


const rootReducers = combineReducers({
    login: authReducer,
    register: registerReducer,
    changePassword: changePasswordReducer,
    setNewPassword: setNewPasswordReducer,
    app: appReducer,
    profile: profileReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducers>
export type AppRootActionsType =
    | LoginActionsType
    | RegisterActionsType
    | ChangePasswordActionsType
    | setNewPasswordActionTypes
    | AppActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store;
