import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent} from 'react';
import {useStyles} from '../styles';

type InputSearchPropsType = {
    placeholderValue: string
    value: string
    dispatchHandler: (value: string) => void
}

export const Input = React.memo(function (props: InputSearchPropsType) {
    const classes = useStyles();

    const onChangeHandler = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.dispatchHandler(e.target.value)
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
            value={props.value}

        />
    )
})
