import React, {ChangeEvent, useState} from "react";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

type AddPackModalPropsType = {
    closeAddPackModal: () => void
    addNewPack: (newPackName: string) => void
}

export const AddPackModal = (props: AddPackModalPropsType) => {
    const [text, setText] = useState<string>('')
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        props.addNewPack(text)
        props.closeAddPackModal()
    }
    const onBackgroundClick = () => {
        props.closeAddPackModal()
    }
    return <>
        <div style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            height: '100%',
            width: '100%',
            backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.2})`,
            zIndex: 10
        }}
             onClick={onBackgroundClick}>
        </div>
        <div style={{
            position: 'fixed',
            left: `calc(50vw - 200px)`,
            top: `calc(50vh - 161px)`,
            width: '400px',
            height: '280px',
            border: '1px solid white',
            borderRadius: '6px 6px 6px 6px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px 0',
            zIndex: 11
        }}>
            <h2>Enter new pack name</h2>
            <TextField
                style={{margin: '30px 0 50px 0'}}
                variant="outlined"
                margin="none"
                label="Name"
                autoFocus
                value={text}
                onChange={inputChangeHandler}
            />
            <Button color="primary" variant={'contained'} onClick={onButtonClickHandler}>Add new pack</Button>
        </div>

    </>
}