import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import {CardsInitialStateType, setCardPacksTC} from '../../../../bll/cards-reducer';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useStyles} from '../../styles';
import {AppRootStateType} from '../../../../bll/store';


export const Input: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)
    const [searchText, setSearchText] = useState(cards.searchText)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchText(e.target.value)

    const onSearchKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && onSearchButtonHandler()
    }

    const onSearchButtonHandler = () => {
        dispatch(setCardPacksTC({packName: searchText}))
    }

    const onClickIconButtonHandler = () => {
        dispatch(setCardPacksTC({packName: ''}))
        setSearchText('')
    }


    return (
        <TextField
            className={classes.input}
            placeholder="Search"
            type="text"
            variant="outlined"
            fullWidth
            size="small"
            onChange={onChangeHandler}
            onKeyPress={onSearchKeyPressHandler}
            value={searchText}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Button onClick={onSearchButtonHandler}>
                            <SearchIcon/>
                        </Button>
                    </InputAdornment>
                ),
                endAdornment: searchText && (
                    <IconButton
                        style={{height: '40px'}}
                        aria-label="toggle password visibility"
                        onClick={onClickIconButtonHandler}
                    >
                        <CancelRoundedIcon/>
                    </IconButton>
                )
            }}
        />
    )
})