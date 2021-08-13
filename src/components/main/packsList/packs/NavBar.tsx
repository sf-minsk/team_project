import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import React, {ChangeEvent, useState} from 'react';
import {useStyles} from '../../styles';
import {CardsInitialStateType, setCardPacksTC} from '../../../../bll/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';

export const NavBar: React.FC = React.memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const packs = useSelector<AppRootStateType, CardsInitialStateType>(state => state.packs)
    const id = useSelector<AppRootStateType, string>(state => state.profile._id)
    const [sliderValue, setSliderValue] = useState<number[]>([packs.min, packs.max])


    const onMyButtonClick = () => {
        dispatch(setCardPacksTC({user_id: id, min: 0, page: 1, pageCount: 5}))
        setSliderValue([0, packs.max])
    }

    const onAllButtonClick = () => {
        dispatch(setCardPacksTC({user_id: '', min: sliderValue[0], max: sliderValue[1], page: 1, pageCount: 5}))
    }

    const changeSliderValue = (e: ChangeEvent<{}>, newValue: number | number[]) => {
        setSliderValue(newValue as number[])
    }

    const changeSliderValueForPayload = () => {
        dispatch(setCardPacksTC({min: sliderValue[0], max: sliderValue[1], page: 1}))
    }


    return (
        <Grid className={classes.navBar}>
            <span className={classes.showPacksCards}>Show packs cards</span>
            <ButtonGroup variant="contained" color="primary" className={classes.MyAllButtons}>
                <Button onClick={onMyButtonClick}
                        variant={packs.myPacks ? 'contained' : 'outlined'}>My</Button>
                <Button onClick={onAllButtonClick}
                        variant={packs.myPacks ? 'outlined' : 'contained'}>All</Button>
            </ButtonGroup>
            <Slider
                className={classes.slider}
                value={sliderValue}
                max={packs.maxCardsCount}
                onChange={changeSliderValue}
                onChangeCommitted={changeSliderValueForPayload}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />
        </Grid>
    )
})