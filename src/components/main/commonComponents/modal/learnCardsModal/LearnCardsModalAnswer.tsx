import React, {useState} from 'react';
import {Button, Radio} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {trimmedString} from '../../../../../utils/trimmedString-util';
import {useStyles} from '../../../styles';
import {ProgressModalComponent} from '../progressModalComponent/ProgressModalComponent';


type LearnCardsModalPropsType = {
    question: string
    answer: string
    packName: string
    openNextRandomCard: (grade: number) => void
    closeAllModal: () => void
}

type obj = {
    valueOfGrade: number
    title: string
}
type GradeType = obj[]


export const LearnCardsModalAnswer = ({
                                          question,
                                          answer,
                                          packName,
                                          openNextRandomCard,
                                          closeAllModal,
                                      }: LearnCardsModalPropsType) => {

    const classes = useStyles()
    const [grade, setGrade] = useState<number>(0)

    const arrayOfGrades: GradeType = [
        {valueOfGrade: 1, title: 'Did not know'},
        {valueOfGrade: 2, title: 'Forgot'},
        {valueOfGrade: 3, title: 'A lot of thought'},
        {valueOfGrade: 4, title: 'Confused'},
        {valueOfGrade: 5, title: 'Knew the answer'},
    ]

    const onBackgroundClick = () => {
        closeAllModal()
    }

    const onChangeCallback = (checkedValue: number) => {
        if (grade === checkedValue) {
            setGrade(0)
        } else if (grade !== checkedValue) {
            setGrade(checkedValue)
        }
    }

    const nextButtonClickHandler = () => {
        openNextRandomCard(grade === 0 ? 1 : grade)
        setGrade(0)
    }


    return (
        <>
            <div className={classes.learnCardsModalDarkWindow}
                 onClick={onBackgroundClick}>
            </div>
            <div style={{
                position: 'fixed',
                left: `calc(50vw - 220px)`,
                top: `calc(50vh - 306px)`,
                width: '440px',
                height: '550px',
                border: '1px solid white',
                borderRadius: '6px 6px 6px 6px',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px 0 40px',
                zIndex: 11
            }}>
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
                <div style={{
                    maxWidth: '440px',
                    overflowWrap: 'break-word',
                    margin: '5px 30px',
                    fontSize: '18px',
                }}>
                    <b>Answer: </b>{trimmedString(answer, 90)}
                </div>

                <div style={{
                    maxWidth: '440px',
                    overflowWrap: 'break-word',
                    margin: '5px 30px',
                    fontSize: '18px',
                }}>
                    <b>{'Rate yourself:'}</b>
                </div>
                <ProgressModalComponent/>
                <FormGroup aria-label="position"
                           style={{
                               margin: '5px 30px',
                               display: 'inline-flex',
                           }}>
                    {
                        arrayOfGrades.map((el, i) => {
                            return <FormControlLabel
                                key={i}
                                name="myRadio"
                                control={<Radio name="myRadio"
                                                color="primary"
                                                checked={el.valueOfGrade === grade}
                                                onClick={() => onChangeCallback(el.valueOfGrade)}/>}
                                label={el.title}
                                labelPlacement="end"
                            />
                        })
                    }
                </FormGroup>

                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={nextButtonClickHandler}
                    style={{margin: '30px auto 0', width: '100px'}}
                >Next</Button>
            </div>
        </>
    )
}

