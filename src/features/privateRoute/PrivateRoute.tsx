import React, {ReactElement} from 'react';
import {Redirect, Route} from 'react-router-dom';

type PropsType = {
    render: () => ReactElement
    isLoggedIn: boolean
    exact?: boolean | undefined
    path: string
    redirectTo: string
}

export const PrivateRoute: React.FC<PropsType> = ({render: Component, isLoggedIn, path, redirectTo, exact}) => {
    return (
        <Route exact path={path} render={() => isLoggedIn
            ? <Component/>
            : <Redirect to={redirectTo}/>
        }/>
    )
}



