import React, {ChangeEvent, useState} from "react";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

type AddPackModalPropsType = {
    closeAddPackModal: () => void
    addNewCard: (question: string, answer: string) => void
}

export const AddCardModal = (props: AddPackModalPropsType) => {
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const inputChangeHandlerQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const inputChangeHandlerAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        props.addNewCard(question, answer)
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
            left: `calc(50vw - 250px)`,
            top: `calc(50vh - 150px)`,
            width: '500px',
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
            <h2>Create new card</h2>
            <TextField
                style={{width: '450px'}}
                label="Question"
                margin="none"
                variant="outlined"
                autoFocus
                value={question}
                onChange={inputChangeHandlerQuestion}
            />

            <TextField
                style={{width: '450px', marginTop: '30px'}}
                label="Answer"
                margin="normal"
                variant="outlined"
                value={answer}
                onChange={inputChangeHandlerAnswer}
            />
            <Button style={{width: '150px', marginTop: '30px'}} color="primary" variant={'contained'}
                    onClick={onButtonClickHandler}>Add new card</Button>
        </div>

    </>
}