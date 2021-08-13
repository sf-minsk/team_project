import React, {ChangeEvent, useState} from "react";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

type AddPackModalPropsType = {
    oldName: string
    closeEditPackModal: () => void
    updatePackName: (name?: string) => void
}

export const EditPackModal = (props: AddPackModalPropsType) => {
    const [newName, setNewName] = useState<string>('')
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        props.updatePackName(newName)
        props.closeEditPackModal()
    }
    const onBackgroundClick = () => {
        props.closeEditPackModal()
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
            top: `calc(50vh - 150px)`,
            width: '400px',
            height: '300px',
            border: '1px solid white',
            borderRadius: '6px 6px 6px 6px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px 0',
            zIndex: 11
        }}>
            <h2>Enter new name of pack</h2>
            <TextField
                style={{margin: '30px 0 50px 0'}}
                variant="outlined"
                margin="none"
                label="New name"
                placeholder={`Old: ${props.oldName}`}
                autoFocus
                value={newName}
                onChange={inputChangeHandler}
            />
            <Button color="primary" variant={'contained'} onClick={onButtonClickHandler}>RENAME</Button>
        </div>

    </>
}