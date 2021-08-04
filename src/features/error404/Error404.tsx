import React, {useCallback} from 'react'
import Error404Img from './Error404.png'
import Button from '@material-ui/core/Button';
import s from './Error404.module.css'
import {useHistory} from 'react-router-dom';

export const Error404 = () => {
    console.log('Error404')

    const history = useHistory()

    const onClickHandler = useCallback(() => {
        history.goBack()
    }, [history])

    return (
        <div className={s.container}>
            <img src={Error404Img} alt={'Error 404: PAGE NOT FOUND'}/>
            <Button
                variant={'contained'}
                size={'small'}
                color={'secondary'}
                onClick={onClickHandler}
            >
                Back
            </Button>
        </div>
    )
}