import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import {setCardPacksTC} from '../../../../bll/cards-reducer';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, KeyboardEvent} from 'react';
import {useDispatch} from 'react-redux';
import {useStyles} from '../../styles';


export const Input: React.FC<InputPropsType> = React.memo((props) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const {searchText, setSearchText} = props


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

type InputPropsType = {
    searchText: string
    setSearchText: (searchText: string) => void
}