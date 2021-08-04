import React, {ChangeEvent, useState} from 'react';
import {ErrorSnackbar} from "../../features/errors/ErrorSnackbar";
import Container from "@material-ui/core/Container/Container";
import {Button, ButtonGroup, Paper, Slider} from "@material-ui/core";
import Typography from '@material-ui/core/Typography/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

export const Main = () => {

    let [myButtonClicked, setMyButtonClicked] = useState(true)
    const onMyButtonClick = () => {
        setMyButtonClicked(true)
    }
    const onAllButtonClick = () => {
        setMyButtonClicked(false)
    }

    const classes = makeStyles(() => ({
        paper: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            minHeight: '800px',
            minWidth: '1000px',
        },
        navBar: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '240px',
            backgroundColor: 'lightblue',
            borderRadius: '4px 0px 0px 4px',
        },
        body: {},
    }))();

    let [value, setValue] = useState<number[]>([10, 20])
    const changeSliderValue = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(newValue as number[])
    }


    return (
        <Container>

            <Paper className={classes.paper}>
                <Grid className={classes.navBar}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px'}}>Show packs cards</span>
                    <ButtonGroup variant="contained" color="primary" style={{marginTop: '20px'}}>
                        <Button onClick={onMyButtonClick}
                                variant={myButtonClicked ? "contained" : "outlined"}>My</Button>
                        <Button onClick={onAllButtonClick}
                                variant={myButtonClicked ? "outlined" : "contained"}>All</Button>
                    </ButtonGroup>
                    <Slider
                        style={{marginTop: '50px', width: '160px'}}
                        value={value}
                        onChange={changeSliderValue}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        // getAriaValueText={value}
                    />


                </Grid>

                <Typography variant="h4" component="h1" gutterBottom>
                    ХУИТА ЕБАНАЯ!ХУИТА ЕБАНАЯ!ХУИТА ЕБАНАЯ!ХУИТА ЕБАНАЯ!
                </Typography>
            </Paper>


            <ErrorSnackbar/>
        </Container>
    )
}