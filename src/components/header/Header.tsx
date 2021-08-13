import React, {useEffect, useState} from 'react';
import {AppBar, Tab, Tabs} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography/Typography';
import {logoutTC} from '../../bll/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {AccountCircleOutlined, DynamicFeedOutlined} from '@material-ui/icons';
import {useHistory, useLocation} from 'react-router-dom';
import {useStyles} from '../main/styles';


export const Header = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    let [value, setValue] = useState(0)

    useEffect(() => {
        if (location.pathname === '/profile') {
            setValue(1)
        } else {
            setValue(0)
        }
    }, [location, value])


    const onPacksClickHandler = () => {
        setValue(0)
        history.push('/')
    }
    const onProfileClickHndler = () => {
        setValue(1)
        history.push('/profile')
    }
    const obLogOutClick = () => {
        dispatch(logoutTC())
    }

    return <>
        <AppBar className={classes.app}>

            <Typography className={classes.typo} variant={"h6"}>
                CARDS
            </Typography>
            {isLoggedIn ?
                <>
                    <Tabs className={classes.tab}
                          value={value}
                          centered
                    >
                        <Tab onClick={onPacksClickHandler} label={'Packs List'} icon={<DynamicFeedOutlined/>}/>
                        <Tab onClick={onProfileClickHndler} label={'Profile'} icon={<AccountCircleOutlined/>}/>
                    </Tabs>
                    <Button className={classes.logoutButton} onClick={obLogOutClick}
                            variant="outlined"
                    >
                        LOGOUT
                    </Button>
                </> : null
            }
        </AppBar>
    </>
}