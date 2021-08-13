import React from 'react';
import {Button} from '@material-ui/core';
import {trimmedString} from '../../../../../utils/trimmedString-util';
import {useStyles} from '../../../styles';

type LearnCardsModalPropsType = {
    packName: string
    question: string
    onAnswerButtonClick: () => void
    closeAllModal: () => void
}

export const LearnCardsModalQuestion = ({
                                            packName,
                                            question,
                                            onAnswerButtonClick,
                                            closeAllModal,
                                        }: LearnCardsModalPropsType) => {

    const classes = useStyles()

    const onBackgroundClick = () => {
        closeAllModal()
    }


    return (
        <>
            <div className={classes.learnCardsModalDarkWindow}
                 onClick={onBackgroundClick}>
            </div>
            <div className={classes.learnCardsModalWindowByQuestion}>
                <h2 style={{
                    maxWidth: '440px',
                    overflowWrap: 'break-word',
                    margin: '10px 30px',
                    textAlign: 'center',
                }}>
                    <b>Learn </b>"{trimmedString(packName, 40)}"
                </h2>
                <div style={{
                    maxWidth: '440px',
                    overflowWrap: 'break-word',
                    margin: '5px 30px',
                    fontSize: '18px',
                }}>
                    <b>Question: </b>{trimmedString(question, 70)}
                </div>
                <Button
                    color="primary" variant={'contained'}
                    onClick={onAnswerButtonClick}
                    style={{margin: '30px auto 0', width: '160px'}}>Show answer</Button>
            </div>
        </>
    )
}