import React, {ChangeEvent, useState} from 'react';
import {Button} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {useDispatch} from 'react-redux';
import {updatedGradeTC} from '../../../../../bll/learn-reducer';

type LearnCardsModalPropsType = {
    closeLearnCardsModal: () => void
    question: string
    answer: string
    packName: string
}

export const LearnCardsModalQuestion = ({
                                            closeLearnCardsModal,
                                            question,
                                            answer,
                                            packName
                                        }: LearnCardsModalPropsType) => {

    const dispatch = useDispatch()
    const [showAnswer, setShowAnswer] = useState(false)
    const [checked, setChecked] = useState(true);

    const showAnswerButtonClickHandler = () => {
        setShowAnswer(true)
    }
    const onBackgroundClick = () => {
        closeLearnCardsModal()
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }
    const nextButtonClickHandler = () => {
        //dispatch(updatedGradeTC())
        setShowAnswer(false)
    }

    if (!showAnswer) {
        return (
            <>
                <div style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    height: '100%',
                    width: '100%',
                    backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.3})`,
                    zIndex: 10
                }}
                     onClick={onBackgroundClick}>
                </div>
                <div style={{
                    position: 'fixed',
                    left: `calc(50vw - 200px)`,
                    top: `calc(50vh - 150px)`,
                    width: '400px',
                    minHeight: '250px',
                    border: '1px solid white',
                    borderRadius: '6px 6px 6px 6px',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 0',
                    zIndex: 11
                }}>
                    <div>
                        <h2 style={{
                            margin: '10px auto',
                            maxWidth: '350px',
                            textAlign: 'center',
                            overflowWrap: 'break-word',
                        }}>
                            {packName}
                        </h2>
                        <div style={{
                            margin: '50px auto',
                            maxWidth: '350px',
                            textAlign: 'center',
                            overflowWrap: 'break-word',
                        }}>
                            <b>Question: </b>{question}
                        </div>
                    </div>

                    <Button
                        color="primary" variant={'contained'}
                        onClick={showAnswerButtonClickHandler}
                        style={{marginTop: '30px'}}>Show answer</Button>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    height: '100%',
                    width: '100%',
                    backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.3})`,
                    zIndex: 10
                }}
                     onClick={onBackgroundClick}>
                </div>
                <div style={{
                    position: 'fixed',
                    left: `calc(50vw - 200px)`,
                    top: `calc(50vh - 300px)`,
                    width: '500px',
                    minHeight: '400px',
                    border: '1px solid white',
                    borderRadius: '6px 6px 6px 6px',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 0',
                    zIndex: 11
                }}>
                    <div>
                        <h2 style={{
                            margin: '10px auto',
                            maxWidth: '450px',
                            textAlign: 'center',
                            overflowWrap: 'break-word',
                        }}>
                            {packName}
                        </h2>
                        <div style={{
                            margin: '20px auto',
                            maxWidth: '450px',
                            textAlign: 'center',
                            overflowWrap: 'break-word',
                        }}>
                            <div style={{marginBottom: '30px'}}><b>Question: </b>{question}</div>
                            <div style={{marginBottom: '40px'}}><b>Answer: </b>{answer}</div>
                        </div>
                        <FormGroup aria-label="position" style={{margin: '0 auto',}}>
                            <b>{'Rate yourself:'}</b>
                            <FormControlLabel
                                value={checked}
                                control={<Checkbox color="primary" onChange={handleChange}/>}
                                label="1 вариант"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value={checked}
                                control={<Checkbox color="primary" onChange={handleChange}/>}
                                label="2 вариант"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value={checked}
                                control={<Checkbox color="primary" onChange={handleChange}/>}
                                label="3 вариант"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value={checked}
                                control={<Checkbox color="primary" onChange={handleChange}/>}
                                label="4 вариант"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value={checked}
                                control={<Checkbox color="primary" onChange={handleChange}/>}
                                label="5 вариант"
                                labelPlacement="end"
                            />
                        </FormGroup>
                    </div>
                    <Button
                        color="primary"
                        variant={'contained'}
                        onClick={nextButtonClickHandler}
                        style={{marginTop: '30px'}}>Next</Button>
                </div>
            </>
        )
    }
}

