import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import {setCardPacksTC} from '../../../bll/packs-reducer';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useStyles} from '../styles';


type InputSearchPropsType = {
    placeholderValue?: string
    searchTextRequest: string
    setTextTC: (searchText: string) => void
    // setTextTC: (data: {[data: string]: string}) => void
    // packName: string
}

export const Input = React.memo(function (props: InputSearchPropsType) {

    const classes = useStyles();
    const dispatch = useDispatch()

    // const packs = useSelector<AppRootStateType, CardsInitialStateType>(state => state.packs)
    const [searchText, setSearchText] = useState<string>(props.searchTextRequest)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchText(e.target.value)

    const onSearchKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && onSearchButtonHandler()
    }

    const onSearchButtonHandler = () => {
        props.setTextTC(searchText)
    }

    const onClickIconButtonHandler = () => {
        dispatch(setCardPacksTC({packName: ''}))
        setSearchText('')
    }


    return (
        <TextField
            className={classes.input}
            placeholder={props.placeholderValue ? props.placeholderValue : "Search"}
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
// export const Input  = React.memo(function(props: InputSearchPropsType){
//
//     const classes = useStyles();
//     const dispatch = useDispatch()
//
//     const packs = useSelector<AppRootStateType, CardsInitialStateType>(state => state.packs)
//     const [searchText, setSearchText] = useState(packs.searchText)
//
//
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchText(e.target.value)
//
//     const onSearchKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         (e.key === 'Enter') && onSearchButtonHandler()
//     }
//
//     const onSearchButtonHandler = () => {
//         dispatch(setCardPacksTC({packName: searchText}))
//     }
//
//     const onClickIconButtonHandler = () => {
//         dispatch(setCardPacksTC({packName: ''}))
//         setSearchText('')
//     }
//
//
//     return (
//         <TextField
//             className={classes.input}
//             placeholder={props.placeholderValue ? props.placeholderValue : "Search"}
//             type="text"
//             variant="outlined"
//             fullWidth
//             size="small"
//             onChange={onChangeHandler}
//             onKeyPress={onSearchKeyPressHandler}
//             value={searchText}
//             InputProps={{
//                 startAdornment: (
//                     <InputAdornment position="start">
//                         <Button onClick={onSearchButtonHandler}>
//                             <SearchIcon/>
//                         </Button>
//                     </InputAdornment>
//                 ),
//                 endAdornment: searchText && (
//                     <IconButton
//                         style={{height: '40px'}}
//                         aria-label="toggle password visibility"
//                         onClick={onClickIconButtonHandler}
//                     >
//                         <CancelRoundedIcon/>
//                     </IconButton>
//                 )
//             }}
//         />
//     )
// })