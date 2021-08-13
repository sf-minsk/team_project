import React, {ChangeEvent, useState} from "react";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {EditCardRequestType, OnePackType} from "../../../../../dal/cards-api";


type EditPackModalPropsType = {
    closeAddPackModal: () => void
    editCard: (data: EditCardRequestType) => void
    card: OnePackType
}

export const EditCardModal = (props: EditPackModalPropsType) => {


    const [question, setQuestion] = useState<string>(props.card.question)
    const [answer, setAnswer] = useState<string>(props.card.answer)

    const inputChangeHandlerQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const inputChangeHandlerAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        props.editCard({cardsPack_id: props.card.cardsPack_id, _id: props.card._id, answer, question})
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
            top: `calc(50vh - 171px)`,
            width: '500px',
            height: '300px',
            border: '1px solid white',
            borderRadius: '6px 6px 6px 6px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px 0',
            zIndex: 11
        }}>
            <h2>Edit card</h2>
            <TextField
                label="Question"
                style={{width: '450px'}}
                margin="none"
                variant="outlined"
                value={question}
                onChange={inputChangeHandlerQuestion}
            />

            <TextField
                label="Answer"
                style={{width: '450px', marginTop: '30px'}}
                margin="none"
                variant="outlined"
                value={answer}
                onChange={inputChangeHandlerAnswer}
            />
            <Button
                style={{width: '150px', marginTop: '30px'}}
                color="primary"
                variant={'contained'}
                onClick={onButtonClickHandler}>Save changes</Button>
        </div>

    </>
}